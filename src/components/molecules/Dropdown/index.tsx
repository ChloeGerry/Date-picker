import { Ref, RefObject, forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CalendarType, getCalendar } from "@/utils/Calendar/getCalendar";
import { KEYBOARD_NAVIGATION } from "@/utils/navigation";
import downArrow from "@/assets/down-arrow.png";

type DropdownProps = {
  dropdownProps: {
    options: Array<string | number>;
    highlightOption?: string | number;
    month: number;
    onClickUpdateMonth: (month: number) => void;
    year: number;
    onClickUpdateYear: (year: number) => void;
    onClickUpdateCalendar: (calendar: CalendarType[]) => void;
    id: string;
    onClickUpdateDropdownDisplay: (id: string | null) => void;
    isDropdownOpen: string | null;
  };
  ref?: Ref<HTMLParagraphElement | null>;
};

const Dropdown = forwardRef<HTMLParagraphElement | null, DropdownProps>(
  ({ dropdownProps }, ref) => {
    const selectedOptionRef = ref as RefObject<HTMLParagraphElement>;

    const {
      options,
      highlightOption,
      month,
      onClickUpdateMonth,
      year,
      onClickUpdateYear,
      onClickUpdateCalendar,
      id,
      onClickUpdateDropdownDisplay,
      isDropdownOpen,
    } = dropdownProps;

    const [selectedOption, setSelectedOption] = useState(highlightOption ?? options[0]);
    const newValue = isDropdownOpen === id ? null : id;

    useEffect(() => {
      setSelectedOption(highlightOption ?? options[0]);
    }, [month, year, highlightOption, options]);

    useEffect(() => {
      if (isDropdownOpen && selectedOptionRef && selectedOptionRef.current) {
        selectedOptionRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, [isDropdownOpen, selectedOptionRef]);

    const handleDropdownKeyboardOpeningAndClosing = (
      event: React.KeyboardEvent<HTMLImageElement | HTMLSpanElement>
    ): void => {
      if (event.key === KEYBOARD_NAVIGATION.ARROW_DOWN || event.key === KEYBOARD_NAVIGATION.ENTER) {
        onClickUpdateDropdownDisplay(newValue);
      }

      if (event.key === KEYBOARD_NAVIGATION.ARROW_UP || event.key === KEYBOARD_NAVIGATION.ESCAPE) {
        onClickUpdateDropdownDisplay(newValue);
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

      if (isOptionAString) {
        onClickUpdateMonth(index);
      } else {
        onClickUpdateYear(option);
      }

      const updatedCalendar = isOptionAString
        ? getCalendar(year, index)
        : getCalendar(option, month);
      onClickUpdateCalendar(updatedCalendar);
      setSelectedOption(option);
      onClickUpdateDropdownDisplay(newValue);
    };

    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 w-fit rounded-md">
          <span
            onClick={() => onClickUpdateDropdownDisplay(newValue)}
            onKeyDown={(event) => handleDropdownKeyboardOpeningAndClosing(event)}
            className="cursor-pointer text-gray-900"
          >
            {selectedOption}
          </span>
          <img
            src={downArrow}
            className={twMerge(
              "w-4 h-4 cursor-pointer text-gray-900",
              isDropdownOpen === id && "transition rotate-180"
            )}
            onClick={() => onClickUpdateDropdownDisplay(newValue)}
            onKeyDown={(event) => handleDropdownKeyboardOpeningAndClosing(event)}
            tabIndex={0}
          />
        </div>
        <div
          className={twMerge(
            "absolute flex flex-col",
            isDropdownOpen === id &&
              "z-10 top-12 bg-white border-[1px] w-fit h-[306px] overflow-scroll px-4 py-2 rounded"
          )}
        >
          {isDropdownOpen === id &&
            options.map((option, index) => (
              <span
                className={twMerge(
                  "cursor-pointer text-gray-900 p-1",
                  selectedOption === option && "bg-gray-200"
                )}
                onClick={() => updateSelectedOption(option, index)}
                ref={selectedOption === option ? selectedOptionRef : null}
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
  }
);

export default Dropdown;
