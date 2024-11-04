import { createSlice } from "@reduxjs/toolkit";
import { InitialPersonState } from "../../Types";

const initialState: InitialPersonState = {
  person_id: null,
  person_name: null,
  created_at: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.person_id = action.payload.person_id;
      state.person_name = action.payload.person_name;
      state.created_at = action.payload.created_at;
    },
  },
});

export const { getAll } = personSlice.actions;
export default personSlice.reducer;
