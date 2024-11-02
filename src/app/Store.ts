import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
// import channelsReducer from "../features/ChannelsSlice";
import { channel } from "diagnostics_channel";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
