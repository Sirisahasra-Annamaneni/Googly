import { useState } from 'react';

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ src, name, size = 30 }) {
  const [broken, setBroken] = useState(false);
  const style = { width: size, height: size };

  if (!src || broken) {
    return (
      <div className="avatar avatar-fallback" style={style}>
        {initials(name)}
      </div>
    );
  }
  return (
    <div className="avatar" style={style}>
      <img src={src} alt="" onError={() => setBroken(true)} />
    </div>
  );
}
