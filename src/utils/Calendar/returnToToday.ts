import { CalendarType, getCalendar } from "./getCalendar";

type paramsType = {
  initialYear: number;
  initialMonth: number;
  onClickUpdateMonth: (month: number) => void;
  onClickUpdateYear: (year: number) => void;
  onClickUpdateCalendar: (calendar: CalendarType[]) => void;
};

export const returnToToday = (param: paramsType): void => {
  const initialCalendar = getCalendar(param.initialYear, param.initialMonth);

  param.onClickUpdateMonth(param.initialMonth);
  param.onClickUpdateYear(param.initialYear);
  param.onClickUpdateCalendar(initialCalendar);
};
