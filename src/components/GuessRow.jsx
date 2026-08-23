import Avatar from './Avatar';
import { compareAttribute } from '../useGoogly';
import { flagUrl } from '../data/flags';

const FIELDS = ['country', 'role', 'battingStyle', 'bowlingStyle', 'age'];

export default function GuessRow({ guess, target, isLatest }) {
  return (
    <div className={'guess-row' + (isLatest ? ' latest' : '')}>
      <div className="tile">
        <div className="tile-inner good" style={{ '--delay': '0ms' }}>
          <Avatar src={guess.image} name={guess.name} size={26} />
          <div className="pname">{guess.name}</div>
        </div>
      </div>

      {FIELDS.map((field, i) => {
        const { status, arrow } = compareAttribute(field, guess, target);
        const value = guess[field];
        const flag = field === 'country' ? flagUrl(value) : null;

        return (
          <div className="tile" key={field}>
            <div
              className={'tile-inner ' + status}
              style={{ '--delay': `${100 + i * 90}ms` }}
            >
              {flag && <img className="tile-flag" src={flag} alt="" />}
              <div className="val">{value}</div>
              {arrow && <div className="arrow">{arrow === 'up' ? '▲' : '▼'}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
