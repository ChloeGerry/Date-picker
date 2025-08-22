import { useMemo, useRef } from "react";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import Dropdown from "@/components/molecules/Dropdown";
import { CalendarType } from "@/utils/Calendar/getCalendar";
import { days, getAllYears, isDateBetweenMinimumAndMaximum, months } from "@/utils/dates";
import { KEYBOARD_NAVIGATION } from "@/utils/navigation";
import { getUpdatedCalendar, getUpdatedCalendarType } from "@/utils/Calendar/getUpdatedCalendar";
import { returnToToday } from "@/utils/Calendar/returnToToday";
import { NOT_MATCHING_DATE } from "@/utils/constants";
import downArrow from "@/assets/down-arrow.png";
import home from "@/assets/home.png";

type CalendarProps = {
  calendarRef: React.RefObject<HTMLDivElement | null>;
  calendar: CalendarType[] | null;
  onClickUpdateCalendar: (calendar: CalendarType[]) => void;
  initialMonth: number;
  month: number;
  onClickUpdateMonth: (month: number) => void;
  initialYear: number;
  year: number;
  onClickUpdateYear: (year: number) => void;
  onClickUpdateChoosenDate: (date: string) => void;
  selectedDay: number | null;
  onClickUpdateSelectedDay: (day: number) => void;
  onClickUpdateCalendarVisibility: (isVisibile: boolean) => void;
  onClickUpdateErrorMessage: (message: string) => void;
  minimumDate: string;
  maximumDate: string;
  calendarClassName?: string;
};

const Calendar = ({
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
}: CalendarProps) => {
  const currentDate = dayjs().date();
  const selectedOptionRef = useRef<HTMLParagraphElement | null>(null);

  const monthsDropdownProps = useMemo(
    () => ({
      options: months,
      highlightOption: months[month],
      month,
      onClickUpdateMonth,
      year,
      onClickUpdateYear,
      onClickUpdateCalendar,
    }),
    [month, year, onClickUpdateCalendar]
  );

  const yearsDropdownProps = useMemo(() => {
    const years = getAllYears().sort();

    return {
      options: years,
      highlightOption: year,
      month,
      onClickUpdateMonth,
      year,
      onClickUpdateYear,
      onClickUpdateCalendar,
    };
  }, [month, year, onClickUpdateCalendar]);

  const getPreviousOrLastMonth = (isPreviousMonth: boolean): void => {
    const params: getUpdatedCalendarType = {
      month,
      onClickUpdateMonth,
      year,
      onClickUpdateYear,
      onClickUpdateCalendar,
      isPreviousMonth,
    };

    getUpdatedCalendar(params);
  };

  const handleKeyboardPreviousMonth = (event: React.KeyboardEvent<HTMLImageElement>): void => {
    if (event.key === KEYBOARD_NAVIGATION.ENTER) {
      getPreviousOrLastMonth(true);
    }
  };

  const handleKeyboardNextMonth = (event: React.KeyboardEvent<HTMLImageElement>): void => {
    if (event.key === KEYBOARD_NAVIGATION.ENTER) {
      getPreviousOrLastMonth(false);
    }
  };

  const handleKeyboardReturnToToday = (event: React.KeyboardEvent<HTMLImageElement>): void => {
    if (event.key === KEYBOARD_NAVIGATION.ENTER) {
      const params = {
        initialYear,
        initialMonth,
        onClickUpdateMonth,
        onClickUpdateYear,
        onClickUpdateCalendar,
      };
      onClickUpdateChoosenDate("");
      returnToToday(params);
    }
  };

  const handleChoosenDate = (day: number, isPreviousMonth: boolean, isNextMonth: boolean): void => {
    const choosenDay = day < 10 ? `0${day}` : day;
    let choosenMonth = month;
    let updatedYear = year;

    if (isPreviousMonth) {
      choosenMonth = month === 0 ? 11 : month - 1 || month;
      updatedYear = month === 0 ? year - 1 : year;
    }

    if (isNextMonth) {
      choosenMonth = month === 11 ? 0 : month + 1 || month;
      updatedYear = month === 11 ? year + 1 : year;
    }

    const updatedMonth = choosenMonth + 1 < 10 ? `0${choosenMonth + 1}` : choosenMonth + 1;
    const date = `${updatedMonth}/${choosenDay}/${updatedYear}`;

    if (isPreviousMonth || isNextMonth) {
      const params: getUpdatedCalendarType = {
        month,
        onClickUpdateMonth,
        year: updatedYear,
        onClickUpdateYear,
        onClickUpdateCalendar,
        isPreviousMonth,
      };

      getUpdatedCalendar(params);
    }

    onClickUpdateMonth(choosenMonth);
    onClickUpdateYear(updatedYear);
    onClickUpdateSelectedDay(day);
    onClickUpdateChoosenDate(date);

    const dateValidity = isDateBetweenMinimumAndMaximum({
      minimumDate,
      maximumDate,
      formattedDate: date,
    });

    if (!dateValidity) {
      onClickUpdateErrorMessage(NOT_MATCHING_DATE);
    } else {
      onClickUpdateCalendarVisibility(false);
      onClickUpdateErrorMessage("");
    }
  };

  const handleKeyboardChoosenDate = (
    event: React.KeyboardEvent<HTMLParagraphElement>,
    day: number,
    isPreviousMonth: boolean,
    isNextMonth: boolean
  ): void => {
    if (event.key === KEYBOARD_NAVIGATION.ENTER) {
      handleChoosenDate(day, isPreviousMonth, isNextMonth);
    }
  };

  return (
    <div
      ref={calendarRef}
      className={twMerge(
        "border-[1px] border-gray-200 rounded-md bg-white p-4 w-fit justify-self-center absolute top-[42px]",
        calendarClassName
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="border-[1px] border-gray-200 rounded-md p-1">
            <img
              src={downArrow}
              className="w-4 h-4 cursor-pointer transition rotate-90"
              onClick={() => getPreviousOrLastMonth(true)}
              onKeyDown={(event) => handleKeyboardPreviousMonth(event)}
              tabIndex={0}
            />
          </div>
          <img
            src={home}
            className="w-4 h-4 cursor-pointer"
            onClick={() => {
              const params = {
                initialYear,
                initialMonth,
                onClickUpdateMonth,
                onClickUpdateYear,
                onClickUpdateCalendar,
              };

              onClickUpdateChoosenDate("");
              return returnToToday(params);
            }}
            onKeyDown={(event) => handleKeyboardReturnToToday(event)}
            tabIndex={0}
          />
        </div>
        <div className="flex gap-2">
          <Dropdown dropdownProps={monthsDropdownProps} ref={selectedOptionRef} />
          <Dropdown dropdownProps={yearsDropdownProps} ref={selectedOptionRef} />
        </div>
        <div className="border-[1px] border-gray-200 rounded-md p-1">
          <img
            src={downArrow}
            className="w-4 h-4 cursor-pointer transition -rotate-90 text-gray-900"
            onClick={() => getPreviousOrLastMonth(false)}
            onKeyDown={(event) => handleKeyboardNextMonth(event)}
            tabIndex={0}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 py-4 px-2">
        {days.map((day, index) => (
          <p key={index} className="text-center p-1 text-gray-900">
            {day}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 border-[1px] border-gray-200 rounded-md p-2">
        {calendar?.map(({ day, isPreviousMonth, isNextMonth }, index) => {
          let isCurrentDate;

          if (!isPreviousMonth && !isNextMonth) {
            isCurrentDate = selectedDay
              ? calendar[index].day === selectedDay
              : calendar[index].day === currentDate;
          }
          return (
            <p
              key={index}
              className={twMerge(
                "text-center p-1 text-gray-900 cursor-pointer hover:bg-gray-200",
                isCurrentDate && "border border-gray-200",
                (isPreviousMonth || isNextMonth) && "text-gray-300 hover:bg-gray-100"
              )}
              onClick={() => handleChoosenDate(day, isPreviousMonth, isNextMonth)}
              onKeyDown={(event) =>
                handleKeyboardChoosenDate(event, day, isPreviousMonth, isNextMonth)
              }
              tabIndex={0}
            >
              {day}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
