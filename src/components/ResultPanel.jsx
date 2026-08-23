import Avatar from './Avatar';

export default function ResultPanel({ won, target, onPlayAgain }) {
  return (
    <div className="result">
      <div className="flag">{won ? "That's Out! ✅" : 'Innings Over'}</div>
      <h2>{won ? 'Well Guessed!' : 'Better Luck Next Time'}</h2>

      <div className="player-card">
        <Avatar src={target.image} name={target.name} size={64} />
        <div className="info">
          <div className="n">{target.name}</div>
          <div className="d">
            {target.country} · {target.role} · Age {target.age}
          </div>
          <div className="d">
            {target.battingStyle}
            {target.bowlingStyle !== 'Does Not Bowl' ? ` · ${target.bowlingStyle}` : ''}
          </div>
        </div>
      </div>

      <button className="again-btn" onClick={onPlayAgain}>
        Play Another (Practice)
      </button>
    </div>
  );
}
