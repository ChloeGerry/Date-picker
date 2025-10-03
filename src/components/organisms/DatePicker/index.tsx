import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import Input from "@/components/atoms/Input";
import Calendar from "@/components/molecules/Calendar";
import { CalendarType, getCalendar } from "@/utils/Calendar/getCalendar";
import { regexDate, regexDateFormat } from "@/utils/regex";
import { displayErrorIfDateIsntBetweenMinimumAndMaximum } from "@/utils/dates";
import { KEYBOARD_NAVIGATION } from "@/utils/navigation";
import { returnToToday } from "@/utils/Calendar/returnToToday";
import { UNVALID_FORMAT_DATE } from "@/utils/constants";

type DatePickerProps = {
  minimumDate?: string;
  maximumDate?: string;
  id?: string;
  containerClassName?: string;
  calendarClassName?: string;
};

const DatePicker = ({
  minimumDate = "01/01/1950",
  maximumDate = "12/31/2050",
  id,
  containerClassName,
  calendarClassName,
  ...props
}: DatePickerProps) => {
  const initialMonth = dayjs().month();
  const initialYear = dayjs().year();

  const [choosenDate, setChoosenDate] = useState("");
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [calendar, setCalendar] = useState<CalendarType[] | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent): void => {
    if (!inputRef.current || !calendarRef.current) {
      return;
    }

    const isFocusOutsideDatePicker =
      !inputRef.current.contains(event.target as Node) &&
      !calendarRef.current.contains(event.target as Node);

    if (isFocusOutsideDatePicker) {
      onClickUpdateErrorMessage("");
      onClickUpdateCalendarVisibility(false);
    }
  }, []);

  useEffect(() => {
    const initialCalendar = getCalendar(year, month);
    onClickUpdateCalendar(initialCalendar);
    document.addEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside, month, year]);

  const handleInputClick = (): void => onClickUpdateCalendarVisibility(true);

  const handleKeyboardCalendarVisibility = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === KEYBOARD_NAVIGATION.TAB || event.key === KEYBOARD_NAVIGATION.ENTER) {
      onClickUpdateCalendarVisibility(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const formattedDate = event.target.value;
    setChoosenDate(event.target.value);

    if (regexDate.test(formattedDate)) {
      const datesParams = { minimumDate, maximumDate, formattedDate };
      displayErrorIfDateIsntBetweenMinimumAndMaximum({ datesParams, onClickUpdateErrorMessage });

      setSelectedDay(Number(formattedDate.slice(3, 5)));
      setMonth(Number(formattedDate.slice(0, 2)) - 1);
      setYear(Number(formattedDate.slice(6, 10)));
    }

    if (!formattedDate) {
      const params = {
        initialYear,
        initialMonth,
        onClickUpdateMonth,
        onClickUpdateYear,
        onClickUpdateCalendar,
      };
      returnToToday(params);
    }

    if (!regexDate.test(formattedDate) && regexDateFormat.test(formattedDate)) {
      setErrorMessage(UNVALID_FORMAT_DATE);
    }
  };

  const onClickUpdateCalendar = (calendar: CalendarType[]): void => {
    setCalendar(calendar);
  };

  const onClickUpdateChoosenDate = (date: string): void => {
    setChoosenDate(date);
  };

  const onClickUpdateErrorMessage = (message: string): void => {
    setErrorMessage(message);
  };

  const onClickUpdateCalendarVisibility = (isVisibile: boolean): void => {
    setIsCalendarVisible(isVisibile);
  };

  const onClickUpdateMonth = (month: number): void => {
    setMonth(month);
  };

  const onClickUpdateYear = (year: number): void => {
    setYear(year);
  };

  const onClickUpdateSelectedDay = (day: number): void => {
    setSelectedDay(day);
  };

  const calendarProps = {
    calendarRef,
    calendar,
    onClickUpdateCalendar,
    initialMonth,
    month,
    onClickUpdateMonth,
    initialYear,
    year,
    onClickUpdateYear,
    onClickUpdateChoosenDate,
    selectedDay,
    onClickUpdateSelectedDay,
    onClickUpdateCalendarVisibility,
    onClickUpdateErrorMessage,
    minimumDate,
    maximumDate,
    calendarClassName,
  };

  return (
    <div className={twMerge("flex flex-col", containerClassName)}>
      <Input
        id={id}
        ref={inputRef}
        placeholder="MM/DD/YYYY"
        onClick={() => handleInputClick()}
        onChange={(event) => handleInputChange(event)}
        value={choosenDate}
        hasErrorMessage={errorMessage}
        onKeyDown={(event) => handleKeyboardCalendarVisibility(event)}
        {...props}
      />
      {errorMessage && <p className="py-2 text-red-700">{errorMessage}</p>}
      {isCalendarVisible && <Calendar {...calendarProps} />}
    </div>
  );
};

export default DatePicker;
