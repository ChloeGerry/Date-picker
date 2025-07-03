import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CalendarType, getCalendar } from "@/utils/Calendar/getCalendar";
import { KEYBOARD_NAVIGATION } from "@/utils/navigation";

type DropdownProps = {
  dropdownProps: {
    options: Array<string | number>;
    highlightOption?: string | number;
    month: number;
    onClickUpdateMonth: (month: number) => void;
    year: number;
    onClickUpdateYear: (year: number) => void;
    onClickUpdateCalendar: (calendar: CalendarType[]) => void;
  };
};

const Dropdown = ({ dropdownProps }: DropdownProps) => {
  if (!dropdownProps) {
    return false;
  }

  const {
    options,
    highlightOption,
    month,
    onClickUpdateMonth,
    year,
    onClickUpdateYear,
    onClickUpdateCalendar,
  } = dropdownProps;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(highlightOption ?? options[0]);

  useEffect(() => {
    setSelectedOption(highlightOption ?? options[0]);
  }, [month, year]);

  const handleDropdownKeyboardOpeningAndClosing = (
    event: React.KeyboardEvent<HTMLImageElement>
  ): void => {
    if (event.key === KEYBOARD_NAVIGATION.ARROW_DOWN || event.key === KEYBOARD_NAVIGATION.ENTER) {
      setIsOpen(true);
    }

    if (event.key === KEYBOARD_NAVIGATION.ARROW_UP) {
      setIsOpen(false);
    }
  };

  const handleKeyboardOptionSelection = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    option: string | number,
    index: number
  ): void => {
    if (event.key === KEYBOARD_NAVIGATION.ENTER) {
      updateSelectedOption(option, index);
    }
  };

  const updateSelectedOption = (option: string | number, index: number) => {
    const isOptionAString = typeof option === "string";
    isOptionAString ? onClickUpdateMonth(index) : onClickUpdateYear(option);
    const updatedCalendar = isOptionAString ? getCalendar(year, index) : getCalendar(option, month);
    onClickUpdateCalendar(updatedCalendar);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 w-fit rounded-md">
        <span className="text-gray-900">{selectedOption}</span>
        <img
          src="../src/assets/down-arrow.png"
          className={twMerge(
            "w-4 h-4 cursor-pointer text-gray-900",
            isOpen && "transition rotate-180"
          )}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(event) => handleDropdownKeyboardOpeningAndClosing(event)}
          tabIndex={0}
        />
      </div>
      <div
        className={twMerge(
          "absolute flex flex-col",
          isOpen &&
            "z-10 top-24 bg-white border-[1px] w-fit h-[306px] overflow-scroll px-4 py-2 rounded"
        )}
      >
        {isOpen &&
          options.map((option, index) => (
            <span
              className={twMerge(
                "cursor-pointer text-gray-900 p-1",
                selectedOption === option && "bg-gray-200"
              )}
              onClick={() => updateSelectedOption(option, index)}
              key={option}
              onKeyDown={(event) => handleKeyboardOptionSelection(event, option, index)}
              tabIndex={0}
            >
              {option}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
