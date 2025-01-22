import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Expense } from "../types/expenses";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const API_BASE_URL = "http://localhost:8080/api";

// Query keys
const queryKeys = {
  auth: {
    currentUser: ["auth", "currentUser"],
  },
  expenses: {
    all: ["expenses"],
    detail: (id: string) => ["expenses", id],
  },
};

export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  body?: unknown
): Promise<T> {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

// Auth API
export async function login(email: string, password: string) {
  return apiRequest<{ token: string }>("/auth/login", "POST", {
    email,
    password,
  });
}

export async function register(email: string, password: string) {
  return apiRequest<{ token: string }>("/auth/register", "POST", {
    email,
    password,
  });
}

export async function getCurrentUser() {
  return apiRequest<{ id: string; email: string }>("/auth/me");
}

export async function logout() {
  return apiRequest<void>("/auth/logout", "POST");
}

// Expenses API
export async function getExpenses() {
  return apiRequest<Array<Expense>>("/expenses");
}

export async function createExpense(expense: Expense) {
  return apiRequest<Expense>("/expenses", "POST", expense);
}

export async function updateExpense(id: string, expense: Expense) {
  return apiRequest<Expense>(`/expenses/${id}`, "PUT", expense);
}

export async function deleteExpense(id: string) {
  return apiRequest<void>(`/expenses/${id}`, "DELETE");
}

// Auth hooks
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials.email, credentials.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
    },
  });
}

// Expense hooks
export function useExpenses() {
  return useQuery({
    queryKey: queryKeys.expenses.all,
    queryFn: getExpenses,
  });
}

export function useCreateExpense() {
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
}

export function useUpdateExpense() {
  return useMutation({
    mutationFn: ({ id, expense }: { id: string; expense: Expense }) =>
      updateExpense(id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
}

export function useDeleteExpense() {
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
}
