export const getPreviousCalendar = (daysInPreviousMonth: number): number[] => {
  const previousMonthCalendar: number[] = [];

  for (let day = 1; day <= daysInPreviousMonth; day++) {
    previousMonthCalendar.push(day);
  }

  return previousMonthCalendar;
};
