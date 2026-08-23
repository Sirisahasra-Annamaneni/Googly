import { useState, useMemo, useCallback } from 'react';
import fullPlayers from './data/players.json';
import starPlayers from './data/star_players.json';

export const MAX_GUESSES = 9;

// Small deterministic PRNG so the "Daily Player" is the same for everyone
// who opens the game on a given date, without needing a backend.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

function pickDaily() {
  const seed = hashStr(new Date().toDateString());
  const rnd = mulberry32(seed);
  return starPlayers[Math.floor(rnd() * starPlayers.length)];
}

function pickRandom() {
  return starPlayers[Math.floor(Math.random() * starPlayers.length)];
}

/**
 * Compares one guessed player's attribute against the target player's.
 * Age is treated specially: exact match is "good", otherwise "bad" plus
 * a direction arrow
 */
export function compareAttribute(field, guess, target) {
  if (field === 'age') {
    if (guess.age === target.age) return { status: 'good', arrow: null };
    return { status: 'bad', arrow: guess.age < target.age ? 'up' : 'down' };
  }
  return { status: guess[field] === target[field] ? 'good' : 'bad', arrow: null };
}

export function useGoogly() {
  const [mode, setMode] = useState('daily'); // 'daily' | 'practice'
  const [target, setTarget] = useState(() => pickDaily());
  const [guesses, setGuesses] = useState([]);

  const guessedIds = useMemo(() => new Set(guesses.map((g) => g.id)), [guesses]);
  const won = guesses.length > 0 && guesses[guesses.length - 1].id === target.id;
  const lost = !won && guesses.length >= MAX_GUESSES;
  const over = won || lost;

  const search = useCallback(
    (query) => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return fullPlayers
        .filter((p) => !guessedIds.has(p.id) && p.search.includes(q))
        .slice(0, 8);
    },
    [guessedIds]
  );

  const submitGuess = useCallback(
    (player) => {
      if (over) return;
      setGuesses((prev) => [...prev, player]);
    },
    [over]
  );

  const newGame = useCallback((nextMode = mode) => {
    setMode(nextMode);
    setTarget(nextMode === 'daily' ? pickDaily() : pickRandom());
    setGuesses([]);
  }, [mode]);

  return {
    mode,
    target,
    guesses,
    won,
    lost,
    over,
    search,
    submitGuess,
    newGame,
    ballsUsed: guesses.length,
    maxGuesses: MAX_GUESSES,
  };
}
