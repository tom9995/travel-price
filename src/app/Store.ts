import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import personReducer from "../features/PersonSlice";
// import channelsReducer from "../features/ChannelsSlice";
import { channel } from "diagnostics_channel";

export const store = configureStore({
  reducer: {
    user: userReducer,
    person: personReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
