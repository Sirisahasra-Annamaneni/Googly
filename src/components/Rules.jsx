export default function Rules({ maxGuesses, rulesRef }) {
  return (
    <section className="rules" ref={rulesRef}>
      <div className="rules-heading">
        <span className="rules-kicker">HOW TO PLAY</span>
        <h2>Read the Clues</h2>
      </div>

      <div className="rules-body">
        <div className="rule-tile">
          <div className="rule-number">01</div>
          <h3>Guess a Cricketer</h3>
          <p>
            Search for any international cricketer and submit your guess.
          </p>
        </div>

        <div className="rule-tile">
          <div className="rule-number">02</div>
          <h3>Match the Clues</h3>
          <p>
            Compare the player's Country, Role, Batting Style, Bowling Style,
            and Age with the mystery cricketer.
          </p>
        </div>

        <div className="rule-tile">
          <div className="rule-number">03</div>
          <h3>
            <span className="inline-good">Green</span> = Correct
          </h3>
          <p>
            A green tile means that attribute is an exact match.
          </p>
        </div>

        <div className="rule-tile">
          <div className="rule-number">04</div>
          <h3>
            <span className="inline-bad">Red</span> = Incorrect
          </h3>
          <p>
            A red tile means that attribute does not match the mystery player.
          </p>
        </div>

        <div className="rule-tile">
          <div className="rule-number">05</div>
          <h3>Follow the Arrows</h3>
          <p>
            ▲ means the mystery player is older. ▼ means the mystery player is
            younger.
          </p>
        </div>

        <div className="rule-tile">
          <div className="rule-number">06</div>
          <h3>Win the Match</h3>
          <p>
            Use the clues to identify the mystery cricketer within{" "}
            {maxGuesses} guesses.
          </p>
        </div>
      </div>

      <div className="rules-footnote">
        <b>Daily Player</b> gives everyone the same mystery cricketer each day.
        <b> Practice Mode</b> generates a fresh random player every round.
      </div>
    </section>
  );
}