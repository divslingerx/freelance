import { createSelector } from "@reduxjs/toolkit";
import { isBefore, isAfter } from "date-fns";
import { RootState } from "@/store/store";

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectFilters = (state: RootState) => state.filters;

export const selectFilteredExpenses = createSelector(
  [selectExpenses, selectFilters],
  (expenses, filters) => {
    return expenses
      .filter((expense) => {
        const { text, startDate, endDate } = filters;
        const createdAtDate = new Date(expense.createdAt);
        const startDateValue = startDate ? new Date(startDate) : null;
        const endDateValue = endDate ? new Date(endDate) : null;

        const startDateMatch = startDateValue
          ? isBefore(startDateValue, createdAtDate)
          : true;
        const endDateMatch = endDateValue
          ? isAfter(endDateValue, createdAtDate)
          : true;
        const textMatch = expense.description
          .toLowerCase()
          .includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
      })
      .sort((a, b) => {
        if (filters.sortBy === "date") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        }
        return b.amount - a.amount;
      });
  }
);
