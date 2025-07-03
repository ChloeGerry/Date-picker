import { CalendarType, getCalendar } from "./getCalendar";
import { getUpdatedMonth } from "./getUpdatedMonth";

export type getUpdatedCalendarType = {
  month: number;
  onClickUpdateMonth: (month: number) => void;
  year: number;
  onClickUpdateYear: (year: number) => void;
  onClickUpdateCalendar: (calendar: CalendarType[]) => void;
  isPreviousMonth: boolean;
};

export const getUpdatedCalendar = ({
  month,
  onClickUpdateMonth,
  year,
  onClickUpdateYear,
  onClickUpdateCalendar,
  isPreviousMonth,
}: getUpdatedCalendarType): void | null => {
  const updatedCalendarMonth = getUpdatedMonth(isPreviousMonth, month, year);

  if (!updatedCalendarMonth) {
    return null;
  }

  const updatedMonth = updatedCalendarMonth.UPDATE_MONTH;

  onClickUpdateMonth(updatedMonth);

  const updatedYear = updatedCalendarMonth.UPDATE_YEAR;

  onClickUpdateYear(updatedYear);

  const previousCalendar = getCalendar(updatedYear, updatedMonth);
  onClickUpdateCalendar(previousCalendar);
};
