# Googly

Googly is a cricket guessing game built with React. Each round hides an international cricketer, and the player searches for cricketers and uses the revealed tiles to identify the mystery player.

## Play Live

🎮 Play this at: [googly9.netlify.app](https://googly9.netlify.app)

## Clone the Repository

```bash
git clone https://github.com/Sirisahasra-Annamaneni/Googly.git
cd Googly/reactapp
```


## How The Game Works

- Search for a player by name and select a suggestion to submit a guess.
- Each guess compares the player's country, role, batting style, bowling style, and age with the mystery player.
- Green tiles show exact matches.
- Dark tiles show attributes that do not match.
- Age tiles include an arrow showing whether the mystery player is older or younger.
- Players have up to 9 guesses.

## Game Modes

### Daily Player

The Daily Player is selected deterministically from the star-player data using the current date. This means everyone receives the same mystery player on the same day.

### Practice

Practice selects a random star player whenever a new practice game starts.

## Project Features

- Searchable player suggestions
- Daily and practice game modes
- Animated guess tiles
- Country flags and player avatars
- Responsive layout for desktop and mobile screens
- Rules section with interactive tiles
- Cricket-ball browser tab icon

## Technology

- React
- Vite
- JavaScript
- CSS
- JSON player data

## Run Locally

From the `reactapp` directory:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Check the source code with Oxlint
```

## Main Project Files

- `src/App.jsx` - Main game screen and component layout
- `src/useGoogly.js` - Game state, player selection, and comparison logic
- `src/components/` - Header, search, guess rows, results, rules, and avatars
- `src/data/players.json` - Full searchable player dataset
- `src/data/star_players.json` - Players used as mystery targets
- `src/data/flags.js` - Country flag mapping
- `public/cricket-ball.svg` - Browser tab icon
