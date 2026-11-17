// Remembers which campaign link brought the visitor (utm_source etc.) for this
// browser session, so the WhatsApp order can tell the owner where it came from.
// No cookies and no third-party analytics.
const KEY = 'ydd-source';
const clean = (v) => (v || '').replace(/[^\w\s.-]/g, '').slice(0, 40);

export function captureAttribution() {
  try {
    const p = new URLSearchParams(window.location.search);
    const source = clean(p.get('utm_source'));
    if (!source) return;
    sessionStorage.setItem(KEY, JSON.stringify({ source, medium: clean(p.get('utm_medium')), campaign: clean(p.get('utm_campaign')) }));
  } catch {
    /* storage unavailable */
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}

export function attributionLabel() {
  const a = getAttribution();
  if (!a) return '';
  return [a.source, a.campaign].filter(Boolean).join(' / ');
}
