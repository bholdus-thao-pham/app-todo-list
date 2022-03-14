import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthenticationSliceType {
  isAuthenticated: boolean;
}

const initialState: AuthenticationSliceType = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {},
    loginSuccess(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export const selectLoggin = (state: RootState) =>
  state.authentication.isAuthenticated;

export default authSlice.reducer;
