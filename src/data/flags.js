// West Indies is a multi-nation cricket team, not a country, so it has no
// ISO flag — the UI falls back to a plain badge for it.
export const COUNTRY_TO_FLAG = {
  India: 'in',
  Pakistan: 'pk',
  Australia: 'au',
  England: 'gb-eng',
  'South Africa': 'za',
  'New Zealand': 'nz',
  'Sri Lanka': 'lk',
  Bangladesh: 'bd',
  Afghanistan: 'af',
  Ireland: 'ie',
  Zimbabwe: 'zw',
  // 'West Indies' intentionally omitted — no ISO flag exists for it.
};

export function flagUrl(country, width = 40) {
  const code = COUNTRY_TO_FLAG[country];
  return code ? `https://flagcdn.com/w${width}/${code}.png` : null;
}
