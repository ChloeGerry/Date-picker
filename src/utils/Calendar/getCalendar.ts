import { getPreviousCalendar } from "./getPreviousCalendar";
import { getFirstDayOfMonth } from "./getFirstDayOfMonth";
import { getLastDayOfMonth } from "./getLastDayOfMonth";
import { getNextCalendar } from "./getNextCalendar";

export type CalendarType = {
  day: number;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
};

export const getCalendar = (year: number, month: number): CalendarType[] => {
  const updatedMonth = month + 1;

  const daysInAWeek = 7;
  const currentMonthFirstDay = getFirstDayOfMonth(year, updatedMonth);
  const firstDayOfWeekInCurrentMonth = currentMonthFirstDay.day();
  const daysInCurrentMonth = currentMonthFirstDay.daysInMonth();
  const currentMonthLastDay = getLastDayOfMonth(year, updatedMonth, daysInCurrentMonth);
  const lastDayOfWeekInCurrentMonth = currentMonthLastDay.day();

  const previousMonth = updatedMonth - 1;
  const previousMonthFirstDay = getFirstDayOfMonth(year, previousMonth);
  const daysInPreviousMonth = previousMonthFirstDay.daysInMonth();

  const previousMonthCalendar = getPreviousCalendar(daysInPreviousMonth);

  const daysInPreviousCalendarToAdd =
    firstDayOfWeekInCurrentMonth === 0
      ? 0
      : previousMonthCalendar.slice(-firstDayOfWeekInCurrentMonth);

  const calendar: CalendarType[] = [];

  daysInPreviousCalendarToAdd !== 0 &&
    daysInPreviousCalendarToAdd.forEach((day) => {
      return calendar.push({ day: day, isPreviousMonth: true, isNextMonth: false });
    });

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendar.push({ day: day, isPreviousMonth: false, isNextMonth: false });
  }

  const nextMonthCalendar = getNextCalendar(daysInAWeek, lastDayOfWeekInCurrentMonth);

  nextMonthCalendar.forEach((day) =>
    calendar.push({ day: day, isPreviousMonth: false, isNextMonth: true })
  );

  return calendar;
};
