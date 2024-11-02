import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../../Types";

const initialState: InitialUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      console.log(action.payload);
      //   ログイン後のstateの更新
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    signUp: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signIn, signOut, signUp } = userSlice.actions;
export default userSlice.reducer;
