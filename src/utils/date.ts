// Shared date formatting. Long form for bylines, ISO for <time datetime>.
const LONG = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(d: Date): string {
  return LONG.format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
