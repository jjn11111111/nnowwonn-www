/**
 * EnterFace · Q&A lane handoffs · HOST allow only · no NW chat pipe.
 * Symbiote / Studio = new tab + optional moment file. Witness = clipboard packet for Cursor.
 */

export const LANES = /** @type {const} */ ({
  hold: 'hold',
  symbiote: 'symbiote',
  studio: 'studio',
  witness: 'witness',
});

const SYMBIOTE_BASE = 'https://portableri.com/onboarding.html?begin=1&from=enterface';
const STUDIO_BASE = 'https://portableri.com/studio.html?shore=nnowwonn&from=enterface';

/**
 * @param {{ id?: string, sha256?: string }} ctx
 */
export function symbioteHandoffUrl(ctx = {}) {
  const u = new URL(SYMBIOTE_BASE);
  if (ctx.id) u.searchParams.set('moment', ctx.id);
  if (ctx.sha256) u.searchParams.set('seal', ctx.sha256.slice(0, 16));
  return u.href;
}

/**
 * @param {{ id?: string, sha256?: string }} ctx
 */
export function studioHandoffUrl(ctx = {}) {
  const u = new URL(STUDIO_BASE);
  if (ctx.id) u.searchParams.set('moment', ctx.id);
  if (ctx.sha256) u.searchParams.set('seal', ctx.sha256.slice(0, 16));
  return u.href;
}

/**
 * @param {{ record: object, sha256: string, messages?: { role: string, text?: string }[] }} opts
 */
export function buildWitnessPacket(opts) {
  const { record, sha256, messages = [] } = opts;
  const excerpt = messages
    .filter((m) => m.role === 'user' || m.role === 'hold')
    .slice(-6)
    .map((m) => {
      if (m.role === 'user') return `- **HOST:** ${String(m.text ?? '').trim()}`;
      return `- **Hold:** (see moment below)`;
    })
    .join('\n');

  return `# EnterFace · Witness handoff · CurseCom / CC Supreme

Paste this into a **Cursor** thread (Witness seat). This is not web chat on NW.

## SEAT CHECK (message 1 ritual)
- Foreground: **Composer 2.5 Fast** · CC Supreme gatekeeper
- Mode: **Hearth** · head count **1** · no undeclared subagents
- Law: P ≠ K ≠ R · Individual Truth Preservation

## Moment crystal
- **id:** \`${record.id}\`
- **sha256:** \`${sha256}\`
- **capture:** ${record.capture ?? '—'}
- **shore:** ${record.shore ?? 'nnowwonn.com/workbench.html'}

## First form (earliest user-visible)
${record.first_form ?? ''}

## Thread excerpt
${excerpt || '—'}

## HOST intent
Continue interactive Q&A in the Witness seat. NW EnterFace lane held this moment locally; no cloud model on Send.

**AMOR · NOW:WON · handoff · yours**
`;
}

/** @param {string} lane */
export function laneHint(lane) {
  switch (lane) {
    case LANES.symbiote:
      return 'PARI symbiote opens in a new tab. We save one moment file first (HOST allow), then you import in symbiote onboarding.';
    case LANES.studio:
      return 'Full Studio on your Mac (local bench · optional Ollama). Moment file downloads first; import in Studio.';
    case LANES.witness:
      return 'Copies a witness packet for Cursor · CurseCom. Paste as your first message — interactive seat, not this web page.';
    default:
      return 'Send holds on this shore only — no remote LLM on this lane.';
  }
}
