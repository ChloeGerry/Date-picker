import { createRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Calendar from "./index";

// Mocks pour les fonctions
const onClickUpdateCalendar = jest.fn();
const onClickUpdateMonth = jest.fn();
const onClickUpdateYear = jest.fn();
const onClickUpdateChoosenDate = jest.fn();
const onClickUpdateSelectedDay = jest.fn();
const onClickUpdateCalendarVisibility = jest.fn();
const onClickUpdateErrorMessage = jest.fn();

// Mock des données
const calendar = [
  { day: 1, isPreviousMonth: false, isNextMonth: false },
  { day: 2, isPreviousMonth: false, isNextMonth: false },
  { day: 3, isPreviousMonth: false, isNextMonth: false },
];

const calendarProps = {
  calendarRef: createRef<HTMLDivElement>(),
  calendar,
  onClickUpdateCalendar,
  initialMonth: 0,
  month: 0,
  onClickUpdateMonth,
  initialYear: 2025,
  year: 2025,
  onClickUpdateYear,
  onClickUpdateChoosenDate,
  selectedDay: null,
  onClickUpdateSelectedDay,
  onClickUpdateCalendarVisibility,
  onClickUpdateErrorMessage,
  minimumDate: "01/01/2000",
  maximumDate: "12/31/2030",
  calendarClassName: "",
};

describe("Calendar component", () => {
  it("renders calendar days", () => {
    const { getByText } = render(<Calendar {...calendarProps} />);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  it("calls onClickUpdateChoosenDate and other callbacks when a day is clicked", async () => {
    const { getByText } = render(<Calendar {...calendarProps} />);
    const day = getByText("1");

    await userEvent.click(day);

    expect(onClickUpdateMonth).toHaveBeenCalled();
    expect(onClickUpdateYear).toHaveBeenCalled();
    expect(onClickUpdateSelectedDay).toHaveBeenCalledWith(1);
    expect(onClickUpdateChoosenDate).toHaveBeenCalled();
    expect(onClickUpdateCalendarVisibility).toHaveBeenCalled();
    expect(onClickUpdateErrorMessage).toHaveBeenCalled();
  });

  it("calls handleKeyboardChoosenDate on Enter key press", () => {
    const { getByText } = render(<Calendar {...calendarProps} />);
    const day = getByText("2");
    fireEvent.keyDown(day, { key: "Enter" });

    expect(onClickUpdateSelectedDay).toHaveBeenCalledWith(2);
    expect(onClickUpdateChoosenDate).toHaveBeenCalled();
  });

  it("renders month and year dropdowns", () => {
    const { getByText } = render(<Calendar {...calendarProps} />);
    expect(getByText("January")).toBeInTheDocument(); // Mois initial
    expect(getByText("2025")).toBeInTheDocument(); // Année initiale
  });

  it("calls getPreviousOrLastMonth when previous month button is clicked", () => {
    const { container } = render(<Calendar {...calendarProps} />);
    const prevButton = container.querySelectorAll("img")[0]; // premier img = précédent
    fireEvent.click(prevButton);
    expect(onClickUpdateMonth).toHaveBeenCalled();
  });

  it("calls returnToToday when home button is clicked", () => {
    const { container } = render(<Calendar {...calendarProps} />);
    const homeButton = container.querySelectorAll("img")[1]; // deuxième img = home
    fireEvent.click(homeButton);
    expect(onClickUpdateChoosenDate).toHaveBeenCalledWith("");
  });

  it("calls next month function when next month button is clicked", () => {
    const { container } = render(<Calendar {...calendarProps} />);
    const nextButton = container.querySelectorAll("img")[2]; // troisième img = suivant
    fireEvent.click(nextButton);
    expect(onClickUpdateMonth).toHaveBeenCalled();
  });
});
