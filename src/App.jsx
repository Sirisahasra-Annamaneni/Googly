import { useRef } from 'react';
import { useGoogly } from './useGoogly';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GuessRow from './components/GuessRow';
import ResultPanel from './components/ResultPanel';
import Rules from './components/Rules';
import './App.css';

export default function App() {
  const rulesRef = useRef(null);
  const {
    mode,
    target,
    guesses,
    won,
    over,
    search,
    submitGuess,
    newGame,
    ballsUsed,
    maxGuesses,
  } = useGoogly();

  return (
    <div className="page">
      <Header
        mode={mode}
        onModeChange={newGame}
        ballsUsed={ballsUsed}
        maxGuesses={maxGuesses}
        onRulesClick={() => rulesRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      <SearchBar search={search} onSubmitGuess={submitGuess} disabled={over} />

      {guesses.length > 0 && (
        <div className="cols">
          <span>Player</span>
          <span>Country</span>
          <span>Role</span>
          <span>Batting</span>
          <span>Bowling</span>
          <span>Age</span>
        </div>
      )}

      {[...guesses].reverse().map((g, i) => (
        <GuessRow key={g.id + '-' + i} guess={g} target={target} isLatest={i === 0} />
      ))}

      {over && (
        <ResultPanel won={won} target={target} onPlayAgain={() => newGame('practice')} />
      )}

      <Rules maxGuesses={maxGuesses} rulesRef={rulesRef} />

      <footer className="site-footer">
        <a
          href="https://www.linkedin.com/in/sirisahasra-annamaneni-7216b8291/"
          target="_blank"
          rel="noreferrer"
          aria-label="Made by Sirisahasra on LinkedIn"
        >
          Made by Sirisahasra
          <span className="linkedin-mark">in</span>
        </a>
      </footer>
    </div>
  );
}
