import { createRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Dropdown from "./index";

const monthsDropdownProps = {
  options: ["January", "February", "March"],
  highlightOption: "February",
  month: 1,
  year: 2025,
  onClickUpdateMonth: jest.fn(),
  onClickUpdateYear: jest.fn(),
  onClickUpdateCalendar: jest.fn(),
  onClickUpdateDropdownDisplay: jest.fn(),
  id: "month-dropdown",
  isDropdownOpen: null,
};

describe("Dropdown component", () => {
  it("renders the selected option", () => {
    const { getByText } = render(
      <Dropdown dropdownProps={monthsDropdownProps} ref={createRef()} />
    );

    expect(getByText("February")).toBeInTheDocument();
  });

  it("opens the dropdown on click", async () => {
    const handleDropdown = jest.fn();
    const { getByText } = render(
      <Dropdown
        dropdownProps={{ ...monthsDropdownProps, onClickUpdateDropdownDisplay: handleDropdown }}
        ref={createRef()}
      />
    );

    const selectedSpan = getByText("February");
    await userEvent.click(selectedSpan);

    expect(handleDropdown).toHaveBeenCalledWith("month-dropdown"); // newValue = id
  });

  it("selects an option on click and calls proper callbacks", async () => {
    const handleUpdateMonth = jest.fn();
    const handleUpdateCalendar = jest.fn();
    const handleDropdownDisplay = jest.fn();

    const { getByText } = render(
      <Dropdown
        dropdownProps={{
          ...monthsDropdownProps,
          isDropdownOpen: "month-dropdown",
          onClickUpdateMonth: handleUpdateMonth,
          onClickUpdateCalendar: handleUpdateCalendar,
          onClickUpdateDropdownDisplay: handleDropdownDisplay,
        }}
        ref={createRef()}
      />
    );

    const option = getByText("January");
    await userEvent.click(option);

    expect(handleUpdateMonth).toHaveBeenCalledWith(0); // index de "January"
    expect(handleUpdateCalendar).toHaveBeenCalled();
    expect(handleDropdownDisplay).toHaveBeenCalledWith(null); // newValue = null
  });

  it("highlights selected option with bg-gray-200", () => {
    const { getByRole } = render(
      <Dropdown
        dropdownProps={{ ...monthsDropdownProps, isDropdownOpen: "month-dropdown" }}
        ref={createRef()}
      />
    );

    const selectedOption = getByRole("option", { name: "February" });
    expect(selectedOption).toHaveClass("bg-gray-200");
  });

  it("handles keyboard events to open/close dropdown", () => {
    const handleDropdownDisplay = jest.fn();
    const { getByText } = render(
      <Dropdown
        dropdownProps={{
          ...monthsDropdownProps,
          onClickUpdateDropdownDisplay: handleDropdownDisplay,
        }}
        ref={createRef()}
      />
    );

    const selectedSpan = getByText("February");
    fireEvent.keyDown(selectedSpan, { key: "ArrowDown" });
    expect(handleDropdownDisplay).toHaveBeenCalled();
  });

  it("handles keyboard selection of an option", () => {
    const handleUpdateMonth = jest.fn();
    const handleUpdateCalendar = jest.fn();
    const handleDropdownDisplay = jest.fn();

    const { getByText } = render(
      <Dropdown
        dropdownProps={{
          ...monthsDropdownProps,
          isDropdownOpen: "month-dropdown",
          onClickUpdateMonth: handleUpdateMonth,
          onClickUpdateCalendar: handleUpdateCalendar,
          onClickUpdateDropdownDisplay: handleDropdownDisplay,
        }}
        ref={createRef()}
      />
    );

    const option = getByText("January");
    fireEvent.keyDown(option, { key: "Enter" });

    expect(handleUpdateMonth).toHaveBeenCalledWith(0);
    expect(handleUpdateCalendar).toHaveBeenCalled();
    expect(handleDropdownDisplay).toHaveBeenCalledWith(null);
  });
});
