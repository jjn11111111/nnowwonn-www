/** Always use GitHub Pages host (avoids apex / stale redirect split). */
const CANON = 'www.nnowwonn.com';

export function ensureCanonicalHost() {
  if (location.hostname === CANON) return;
  if (!location.hostname.endsWith('nnowwonn.com')) return;
  const target = `https://${CANON}${location.pathname}${location.search}${location.hash}`;
  location.replace(target);
}

ensureCanonicalHost();
