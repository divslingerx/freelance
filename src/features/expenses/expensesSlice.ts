import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export interface Expense {
  id: string;
  description: string;
  note?: string;
  amount: number;
  createdAt: number | Date;
}

export interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    editExpense: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Expense> }>
    ) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = {
          ...state.expenses[index],
          ...action.payload.updates,
        };
      }
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  setLoading,
  setError,
} = expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpensesLoading = (state: RootState) =>
  state.expenses.loading;
export const selectExpensesError = (state: RootState) => state.expenses.error;

export default expensesSlice.reducer;
