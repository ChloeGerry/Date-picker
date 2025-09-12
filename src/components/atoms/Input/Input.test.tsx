import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Input from "./index";

describe("Input component", () => {
  const placeholder = "MM/DD/YYYY";
  const value = "01/01/2025";
  const id = "date-input";

  it("renders the input with correct placeholder and value", () => {
    render(
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        errorMessage=""
        onClick={jest.fn()}
        onChange={jest.fn()}
        onKeyDown={jest.fn()}
        ref={createRef<HTMLInputElement>()}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });

  it("calls onClick when input is clicked", async () => {
    const handleClick = jest.fn();
    render(
      <Input
        id={id}
        placeholder={placeholder}
        value=""
        errorMessage=""
        onClick={handleClick}
        onChange={jest.fn()}
        onKeyDown={jest.fn()}
        ref={createRef()}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    await userEvent.click(input);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onChange when input value changes", async () => {
    const handleChange = jest.fn();
    render(
      <Input
        id={id}
        placeholder={placeholder}
        value=""
        errorMessage=""
        onClick={jest.fn()}
        onChange={handleChange}
        onKeyDown={jest.fn()}
        ref={createRef()}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    await userEvent.type(input, "12");
    expect(handleChange).toHaveBeenCalledTimes(2); // 2 caractères tapés
  });

  it("calls onKeyDown when a key is pressed", () => {
    const handleKeyDown = jest.fn();
    render(
      <Input
        id={id}
        placeholder={placeholder}
        value=""
        errorMessage=""
        onClick={jest.fn()}
        onChange={jest.fn()}
        onKeyDown={handleKeyDown}
        ref={createRef()}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("applies error class when hasErrorMessage is set", () => {
    render(
      <Input
        id={id}
        placeholder={placeholder}
        value=""
        errorMessage="The date format is incorrect"
        onClick={jest.fn()}
        onChange={jest.fn()}
        onKeyDown={jest.fn()}
        ref={createRef()}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toHaveClass("border-red-700");
  });
});
