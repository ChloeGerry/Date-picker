export const getNextCalendar = (
  daysInAWeek: number,
  lastDayOfWeekInCurrentMonth: number
): number[] => {
  const daysInNextMonth = daysInAWeek - lastDayOfWeekInCurrentMonth;
  const nextMonthCalendar = [];

  for (let day = 1; day <= daysInNextMonth - 1; day++) {
    nextMonthCalendar.push(day);
  }

  return nextMonthCalendar;
};
