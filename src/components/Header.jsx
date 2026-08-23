export default function Header({ mode, onModeChange, ballsUsed, maxGuesses, onRulesClick }) {
  return (
    <>
      <div className="header">
        <div className="eyebrow">Daily cricket challenge</div>
        <h1>
          GOO<span>GLY</span>
        </h1>
        <div className="sub">Guess the mystery cricketer</div>
        <button className="rules-link" onClick={onRulesClick} type="button">
          <span>How to play</span>
          <span className="rules-link-arrow">↓</span>
        </button>
        <div className="mode-row">
          <button
            className={'mode-btn' + (mode === 'daily' ? ' active' : '')}
            onClick={() => onModeChange('daily')}
          >
            Daily Player
          </button>
          <button
            className={'mode-btn' + (mode === 'practice' ? ' active' : '')}
            onClick={() => onModeChange('practice')}
          >
            Practice (Random)
          </button>
        </div>
      </div>

      <div className="balls">
        {Array.from({ length: maxGuesses }).map((_, i) => (
          <div key={i} className={'ball-dot' + (i < ballsUsed ? ' used' : '')} />
        ))}
      </div>
    </>
  );
}
