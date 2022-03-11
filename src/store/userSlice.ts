import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import User from "../models/user";

export type UserState = {
  userList: User[];
};

const initialState: UserState = {
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUser(state) {},
    setListUser(state, action: PayloadAction<User[]>) {
      state.userList = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const selectAllUser = (state: RootState) => state.user.userList;

export default userSlice.reducer;
