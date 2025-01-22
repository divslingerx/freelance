import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiRequest<{ token: string }>("/auth/login", "POST", credentials),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => apiRequest<void>("/auth/logout", "POST"),
    onSuccess: () => {
      // Remove token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    },
  });
};
