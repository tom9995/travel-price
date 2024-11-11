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
    init: (state, action) => {
      state.person = action.payload;
    },
    add: (state, action) => {
      const {
        person_id,
        person_name,
        created_at,
        is_deleted = false,
      } = action.payload;
      state.person.push({ person_id, person_name, created_at, is_deleted });
    },
    update: (state, action) => {
      const { person_id, person_name, is_deleted } = action.payload;
      state.person.map((s) => {
        if (s.person_id == person_id) {
          (s.person_name = person_name), (s.is_deleted = is_deleted);
        }
      });
    },
    deletePerson: (state, action) => {
      const { person_id } = action.payload;
      state.person = state.person.filter((p) => p.person_id != person_id);
    },
  },
});

export const { init, add, update, deletePerson } = personSlice.actions;
export default personSlice.reducer;
