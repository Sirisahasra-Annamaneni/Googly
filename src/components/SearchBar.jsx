import { useMemo, useRef, useState } from 'react';
import Avatar from './Avatar';

export default function SearchBar({ search, onSubmitGuess, disabled }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [hiIdx, setHiIdx] = useState(-1);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => search(query), [search, query]);

  function pick(player) {
    onSubmitGuess(player);
    setQuery('');
    setOpen(false);
    setHiIdx(-1);
  }

  function onKeyDown(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHiIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHiIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const p = suggestions[hiIdx >= 0 ? hiIdx : 0];
      if (p) pick(p);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  if (disabled) return null;

  return (
    <div className="search-wrap">
      <input
        ref={inputRef}
        className="search-input"
        placeholder="Type a player name…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHiIdx(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
      />
      {open && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((p, i) => (
            <div
              key={p.id}
              className={'suggestion-item' + (i === hiIdx ? ' hi' : '')}
              onMouseDown={() => pick(p)}
              onMouseEnter={() => setHiIdx(i)}
            >
              <Avatar src={p.image} name={p.name} />
              <div>
                <div className="name">{p.name}</div>
                <div className="meta">
                  {p.country} · {p.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
