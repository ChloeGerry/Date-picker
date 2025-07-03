import dayjs from "dayjs";

export const getFirstDayOfMonth = (year: number, month: number): dayjs.Dayjs => {
  return dayjs(`${year}-${month}-01`);
};
