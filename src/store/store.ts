import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import type { AuthState } from "../features/auth/authSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import type { ExpensesState } from "../features/expenses/expensesSlice";
import filtersReducer, { FiltersState } from "@/features/filters/filtersSlice";

export interface RootState {
  auth: AuthState;
  expenses: ExpensesState;
  filters: FiltersState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
