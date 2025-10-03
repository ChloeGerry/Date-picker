declare module "tailwind-date-picker" {
  import * as React from "react";

  export type DatePickerProps = {
    minimumDate?: string;
    maximumDate?: string;
    id?: string;
    containerClassName?: string;
    calendarClassName?: string;
  };

  export const DatePicker: React.FC<DatePickerProps>;
  export default DatePicker;
}
