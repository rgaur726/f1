export const formatDateRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(s) +
    '–' +
    new Intl.DateTimeFormat('en-US', { day: 'numeric', year: 'numeric' }).format(e);
};

export const monthHeader = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(iso));

export const countdown = (iso: string) => {
  const diff = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(diff);
  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((abs / (1000 * 60)) % 60);
  return { past: diff < 0, days, hours, minutes };
};
