import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
  selectFilters,
} from "@/features/filters/filtersSlice";

const ExpenseListFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: filters.startDate ? new Date(filters.startDate) : undefined,
    to: filters.endDate ? new Date(filters.endDate) : undefined,
  });

  const onDatesChange = (range: DateRange | undefined) => {
    setDateRange(range);
    dispatch(setStartDate(range?.from || null));
    dispatch(setEndDate(range?.to || null));
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTextFilter(e.target.value));
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "date") {
      dispatch(sortByDate());
    } else if (e.target.value === "amount") {
      dispatch(sortByAmount());
    }
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          <input
            type="text"
            className="text-input"
            placeholder="Search Expenses"
            value={filters.text}
            onChange={onTextChange}
          />
        </div>
        <div className="input-group__item">
          <select
            className="select"
            value={filters.sortBy}
            onChange={onSortChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="input-group__item">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDatesChange}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseListFilters;
