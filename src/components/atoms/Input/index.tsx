import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, Ref } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
  onClick: MouseEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  ref: Ref<HTMLInputElement | null>;
  placeholder: string;
  value: string;
  hasErrorMessage: string;
};

const Input = ({
  onClick,
  onKeyDown,
  onChange,
  ref,
  placeholder,
  value,
  hasErrorMessage,
}: InputProps) => {
  return (
    <input
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
      placeholder={placeholder}
      className={twMerge(
        "border max-w-52 border-[#C18845] focus:border-2 focus:border-[#F0BE86] placeholder-[#6A645A] focus:outline-none rounded-sm py-1 px-3 transition-all duration-200",
        hasErrorMessage && "border-red-700 focus:border-red-700"
      )}
      value={value}
      onChange={onChange}
      maxLength={10}
      tabIndex={0}
    />
  );
};

export default Input;
