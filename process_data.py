

import csv
import json
import os
from datetime import datetime, date

# ---------------------------------------------------------------------------
# 1. Config — tune these to change pool size/composition
# ---------------------------------------------------------------------------

INPUT_CSV = "data/players_data_with_all_info.csv"
OUTPUT_DIR = "src/data"

# Countries whose players are eligible for the STAR (mystery-player) pool.
# These are the 12 current ICC Full Members — i.e. the countries whose
# players a casual cricket fan is likely to recognise.
STAR_COUNTRIES = {
    "India", "Pakistan", "Australia", "England", "South Africa", "New Zealand",
    "Sri Lanka", "Bangladesh", "West Indies", "Afghanistan", "Zimbabwe",
}

# Below this id, players were (empirically) seeded as recognised internationals
# for their country. Raise this to widen the star pool, lower to tighten it.
STAR_ID_CEILING = 3000

# Search pool gets a looser ceiling (still trims the ~9000 bulk-imported
# domestic/junior players tacked on at the end of each country) so the
# autocomplete has real depth without ballooning the dataset.
SEARCH_ID_CEILING = 8000

SEARCH_COUNTRIES = STAR_COUNTRIES

BOWLING_ROLES = {"Bowler", "Allrounder", "Bowling Allrounder", "Batting Allrounder"}


# ---------------------------------------------------------------------------
# 2. Helpers
# ---------------------------------------------------------------------------


def nonempty(val):
    return val not in (None, "", "NA", "N/A")


def compute_age(dob_str):
    """dateofbirth is DD-MM-YYYY. Returns None if unparseable."""
    try:
        dob = datetime.strptime(dob_str, "%d-%m-%Y").date()
    except (ValueError, TypeError):
        return None
    today = date.today()
    years = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    if years <= 0 or years > 60:
        return None
    return years


def format_search_name(name):
    return (name or "").strip().lower()


def fix_mojibake(name):
    """A handful of rows in the source CSV have a double-encoded apostrophe
    (e.g. "OÂ\x92Donnell" instead of "O'Donnell"). Repair that specific case."""
    return (name or "").replace("Â\x92", "'").replace("\x92", "'")


def normalize_role(position):
    """Collapse the long-tail role labels down to the 5 the game shows."""
    mapping = {
        "Batsman": "Batsman",
        "Top Order Batter": "Batsman",
        "Middle Order Batter": "Batsman",
        "Bowler": "Bowler",
        "Allrounder": "Allrounder",
        "Batting Allrounder": "Allrounder",
        "Bowling Allrounder": "Allrounder",
        "Wicketkeeper": "Wicketkeeper",
    }
    return mapping.get(position, position or "Unknown")


def clean_style(val, none_label):
    """Turn '' into an explicit label instead of blank so the UI can compare it."""
    if not nonempty(val):
        return none_label
    return val.replace("-", " ").title()


# ---------------------------------------------------------------------------
# 3. Load
# ---------------------------------------------------------------------------

with open(INPUT_CSV, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

male_rows = [r for r in rows if r.get("gender") == "m"]

# ---------------------------------------------------------------------------
# 4. Build FULL pool (search list)
# ---------------------------------------------------------------------------

full_players = []
for row in male_rows:
    country = row.get("country_name", "")
    if country not in SEARCH_COUNTRIES:
        continue
    if int(row["id"]) >= SEARCH_ID_CEILING:
        continue
    if not nonempty(row.get("battingstyle")):
        continue  # need at least a batting style to be guessable/comparable

    age = compute_age(row.get("dateofbirth"))
    if age is None:
        continue

    fullname = row.get("fullname") or f"{row.get('firstname','')} {row.get('lastname','')}".strip()
    fullname = fix_mojibake(fullname)
    if not fullname:
        continue

    player = {
        "id": int(row["id"]),
        "name": fullname,
        "search": format_search_name(fullname),
        "country": country,
        "countryImage": row.get("country_image_path", ""),
        "role": normalize_role(row.get("position")),
        "battingStyle": clean_style(row.get("battingstyle"), "Unknown"),
        "bowlingStyle": clean_style(row.get("bowlingstyle"), "Does Not Bowl"),
        "age": age,
        "image": row.get("image_path", ""),
        "isStar": False,  # set below
    }
    full_players.append(player)

# ---------------------------------------------------------------------------
# 5. Flag the STAR subset (mystery-player pool)
# ---------------------------------------------------------------------------

star_count = 0
for p in full_players:
    if (
        p["country"] in STAR_COUNTRIES
        and p["id"] < STAR_ID_CEILING
        and p["battingStyle"] != "Unknown"
        and not (p["role"] in BOWLING_ROLES and p["bowlingStyle"] == "Does Not Bowl")
    ):
        p["isStar"] = True
        star_count += 1

star_players = [p for p in full_players if p["isStar"]]

# ---------------------------------------------------------------------------
# 6. Save
# ---------------------------------------------------------------------------

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(os.path.join(OUTPUT_DIR, "players.json"), "w", encoding="utf-8") as f:
    json.dump(full_players, f, ensure_ascii=False, indent=2)

with open(os.path.join(OUTPUT_DIR, "star_players.json"), "w", encoding="utf-8") as f:
    json.dump(star_players, f, ensure_ascii=False, indent=2)

print(f"Success! Saved {len(full_players)} players to {OUTPUT_DIR}/players.json")
print(f"Star (mystery-player) pool: {star_count} players -> {OUTPUT_DIR}/star_players.json")

from collections import Counter
print("\nStar pool by country:")
for country, n in Counter(p["country"] for p in star_players).most_common():
    print(f"  {country:20s} {n}")
