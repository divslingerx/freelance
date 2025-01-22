import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import authReducer from "../features/auth/authSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
