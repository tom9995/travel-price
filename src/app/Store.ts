import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import personReducer from "../features/PersonSlice";
import priceReducer from "../features/PriceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    person: personReducer,
    price: priceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
