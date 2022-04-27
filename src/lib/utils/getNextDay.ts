export const getNextDay = (d: Date = new Date()) => {
  d.setDate(d.getDate() + 1);
  d.setHours(2, 0, 0, 0); //GMT +2
  return d.toISOString().slice(0, -1);
};

export const getToday = () => {
  const today = new Date();
  today.setHours(2, 0, 0, 0); //GMT +2
  return today.toISOString().slice(0, -1);
};
