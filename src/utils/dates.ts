import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { NOT_MATCHING_DATE } from "./constants";

export const months: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thi", "Fri", "Sat"];

export const getAllYears = (): Array<number> => {
  const year = dayjs().year();

  const lastFutureYear = year + 25;

  const years = [];

  for (let i = 0; i <= 100; i++) {
    years.push(lastFutureYear - i);
  }

  return years;
};

type isDateBetweenMinimumAndMaximumType = {
  minimumDate?: string;
  maximumDate?: string;
  formattedDate: string;
};

export const isDateBetweenMinimumAndMaximum = ({
  minimumDate,
  maximumDate,
  formattedDate,
}: isDateBetweenMinimumAndMaximumType): boolean => {
  const formattedMinimumDate = dayjs(minimumDate);
  const formattedMaximunDate = dayjs(maximumDate);

  const choosenDate = dayjs(formattedDate);

  dayjs.extend(isBetween);

  const isDateBetweenMinimumAndMaximum = choosenDate.isBetween(
    formattedMinimumDate,
    formattedMaximunDate,
    "day",
    "[]"
  );

  return isDateBetweenMinimumAndMaximum;
};

type displayErrorIfDateIsntBetweenMinimumAndMaximumType = {
  datesParams: {
    minimumDate?: string;
    maximumDate?: string;
    formattedDate: string;
  };
  onClickUpdateErrorMessage: (message: string) => void;
};

export const displayErrorIfDateIsntBetweenMinimumAndMaximum = ({
  datesParams,
  onClickUpdateErrorMessage,
}: displayErrorIfDateIsntBetweenMinimumAndMaximumType): void => {
  const dateValidity = isDateBetweenMinimumAndMaximum({
    minimumDate: datesParams.minimumDate,
    maximumDate: datesParams.maximumDate,
    formattedDate: datesParams.formattedDate,
  });

  !dateValidity ? onClickUpdateErrorMessage(NOT_MATCHING_DATE) : onClickUpdateErrorMessage("");
};
