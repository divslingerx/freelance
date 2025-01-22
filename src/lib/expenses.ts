import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./api";

export interface Expense {
  id: string;
  description: string;
  note?: string;
  amount: number;
  createdAt: number | Date;
}

// Fetch all expenses
export const useExpenses = () => {
  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: () => apiRequest<Expense[]>("/expenses"),
  });
};

// Add new expense
export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expense: Omit<Expense, "id">) =>
      apiRequest<Expense>("/expenses", "POST", expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

// Edit existing expense
export const useEditExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expense: Expense) =>
      apiRequest<Expense>(`/expenses/${expense.id}`, "PUT", expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

// Delete expense
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiRequest<void>(`/expenses/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
