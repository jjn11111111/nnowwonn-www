/** Current shore host · works on www.nnowwonn.com · www.enterfaceri.com · localhost */
const DOMAIN_WWW = {
  'nnowwonn.com': 'www.nnowwonn.com',
  'enterfaceri.com': 'www.enterfaceri.com',
};

export function apexForHost(hostname = location.hostname) {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return null;
  if (hostname.startsWith('www.')) return hostname.slice(4);
  for (const apex of Object.keys(DOMAIN_WWW)) {
    if (hostname === apex || hostname.endsWith(`.${apex}`)) return apex;
  }
  return null;
}

export function canonWww(hostname = location.hostname) {
  const apex = apexForHost(hostname);
  if (apex && DOMAIN_WWW[apex]) return DOMAIN_WWW[apex];
  if (hostname.startsWith('www.')) return hostname;
  return hostname;
}

export function canonOrigin() {
  if (location.protocol === 'http:' || location.protocol === 'https:') {
    return `${location.protocol}//${canonWww()}`;
  }
  return `https://${canonWww()}`;
}

/** LASHER / export label e.g. enterfaceri.com/forum.html */
export function shorePath(page = 'workbench.html') {
  const apex = apexForHost();
  const host = apex ?? location.host;
  return `${host}/${page}`;
}

/** PortAbleRI `?shore=` tag · not the full hostname */
export function shoreQueryTag() {
  const apex = apexForHost();
  if (apex === 'enterfaceri.com') return 'enterfaceri';
  if (apex === 'nnowwonn.com') return 'nnowwonn';
  return 'enterfaceri';
}
