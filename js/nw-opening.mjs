/** Opening screen → Workbench handoff */
export const DRAFT_KEY = 'nw-opening-draft-v1';

export function saveOpeningDraft(text) {
  try {
    sessionStorage.setItem(DRAFT_KEY, text);
  } catch {
    /* private mode */
  }
}

export function consumeOpeningDraft() {
  try {
    const t = sessionStorage.getItem(DRAFT_KEY);
    if (t) sessionStorage.removeItem(DRAFT_KEY);
    return t;
  } catch {
    return null;
  }
}

export function goToWorkbench(text) {
  const t = String(text ?? '').trim();
  saveOpeningDraft(t);
  const url = new URL('workbench.html', location.href);
  if (t) url.searchParams.set('q', t.slice(0, 2000));
  location.href = `${url.pathname}${url.search}`;
}
