import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
