type updatedMonthValuesType = {
  NAVIGATION: boolean;
  UPDATE_MONTH: number;
  UPDATE_YEAR: number;
};

export const getUpdatedMonth = (
  isPreviousMonth: boolean,
  month: number,
  year: number
): updatedMonthValuesType | null => {
  const firstMonth = 0;
  const lastMonth = 11;

  const isFirstMonth = month === firstMonth;
  const isLastMonth = month === lastMonth;

  const updatedMonthValues: updatedMonthValuesType[] = [
    {
      NAVIGATION: isPreviousMonth,
      UPDATE_MONTH: isFirstMonth ? 11 : month - 1,
      UPDATE_YEAR: isFirstMonth ? year - 1 : year,
    },
    {
      NAVIGATION: !isPreviousMonth,
      UPDATE_MONTH: isLastMonth ? 0 : month + 1,
      UPDATE_YEAR: isLastMonth ? year + 1 : year,
    },
  ];

  return updatedMonthValues.find((month) => month.NAVIGATION) ?? null;
};
