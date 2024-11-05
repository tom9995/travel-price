import { createSlice } from "@reduxjs/toolkit";
import { InitialPersonState } from "../../Types";

interface PersonState {
  person: InitialPersonState[];
}

const initialState: PersonState = {
  person: [],
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    add: (state, action) => {
      const { person_id, person_name, created_at } = action.payload;
      state.person.push({ person_id, person_name, created_at });
    },
    delete: (state, action) => {
      const { person_id } = action.payload;
      state.person = state.person.filter((s) => s.person_id != person_id);
    },
  },
});

export const { add } = personSlice.actions;
export default personSlice.reducer;
