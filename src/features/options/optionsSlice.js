import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 9,
  difficulty: "easy",
  type: "multiple",
  score: 0,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export default optionsSlice.reducer;
export const { changeCategory, changeDifficulty, changeType, changeScore } =
  optionsSlice.actions;
