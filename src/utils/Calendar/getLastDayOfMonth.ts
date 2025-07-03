import dayjs from "dayjs";

export const getLastDayOfMonth = (year: number, month: number, date: number): dayjs.Dayjs => {
  return dayjs(`${year}-${month}-${date}`);
};
