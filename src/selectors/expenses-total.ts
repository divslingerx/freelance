import { createSelector } from "@reduxjs/toolkit";
import { selectExpenses } from "./expenses";

export const selectExpensesTotal = createSelector(
  [selectExpenses],
  (expenses) => {
    return expenses
      .map((expense) => expense.amount)
      .reduce((sum, value) => sum + value, 0);
  }
);
