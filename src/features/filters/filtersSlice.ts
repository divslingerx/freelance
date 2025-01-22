import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export interface FiltersState {
  text: string;
  sortBy: "date" | "amount";
  startDate: Date | null;
  endDate: Date | null;
}

const initialState: FiltersState = {
  text: "",
  sortBy: "date",
  startDate: null,
  endDate: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTextFilter: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    sortByDate: (state) => {
      state.sortBy = "date";
    },
    sortByAmount: (state) => {
      state.sortBy = "amount";
    },
    setStartDate: (state, action: PayloadAction<Date | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload;
    },
  },
});

export const {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
