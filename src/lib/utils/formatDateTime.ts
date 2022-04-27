const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatIsoDate = (d: string): string => {
  const date = new Date(d);
  const formattedDate = date.toLocaleString('cs-Cz', {
    weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    // hour: 'numeric', // numeric, 2-digit
    // minute: 'numeric', // numeric, 2-digit
    // second: 'numeric', // numeric, 2-digit
  });
  return `${formattedDate}`;
};

export const formatIsoTime = (d: string): string => {
  const date = new Date(d);
  const formattedDate = date.toLocaleString('cs-Cz', {
    // weekday: 'short', // long, short, narrow
    // day: 'numeric', // numeric, 2-digit
    // year: 'numeric', // numeric, 2-digit
    // month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
    // second: 'numeric', // numeric, 2-digit
  });
  return `${formattedDate}`;
};
