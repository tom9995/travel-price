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
      const {
        price_id,
        price,
        price_title,
        price_detail,
        person_id,
        is_paid,
        is_deleted,
      } = action.payload;
      state.price.map((p) => {
        if (p.price_id == price_id) {
          (p.price = price),
            (p.price_title = price_title),
            (p.price_detail = price_detail),
            (p.person_id = person_id),
            (p.is_deleted = is_deleted);
          p.is_paid = is_paid;
        }
      });
    },
  },
});

export const { initPrice, add, update } = priceSlice.actions;
export default priceSlice.reducer;
