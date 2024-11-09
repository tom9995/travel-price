import { createSlice } from "@reduxjs/toolkit";
import { InitialPriceState } from "../../Types";

interface PriceState {
  price: InitialPriceState[];
}

const initialState: PriceState = {
  price: [],
};

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    initPrice: (state, action) => {
      state.price = action.payload;
    },
    add: (state, action) => {
      const {
        price_id,
        price,
        price_title,
        price_detail,
        created_at,
        is_paid,
      } = action.payload;
      state.price.push({
        price_id,
        price,
        price_title,
        price_detail,
        created_at,
        is_paid,
      });
    },
    update: (state, action) => {
      const { price_id, is_paid } = action.payload;
      state.price.map((p) => {
        if (p.price_id == price_id) p.is_paid = is_paid;
      });
    },
  },
});

export const { initPrice, add, update } = priceSlice.actions;
export default priceSlice.reducer;
