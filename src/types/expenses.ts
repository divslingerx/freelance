export type { Expense } from "../features/expenses/expensesSlice";

export interface FiltersState {
  text: string;
  sortBy: "date" | "amount";
  startDate: Date | null;
  endDate: Date | null;
}
