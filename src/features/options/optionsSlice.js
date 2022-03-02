import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  difficulty: "",
  type: "",
  score: 0,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload.length
        ? `&category=${action.payload}`
        : action.payload;
    },
    changeDifficulty: (state, action) => {
      state.difficulty = action.payload.length
        ? `&difficulty=${action.payload}`
        : action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload.length
        ? `&type=${action.payload}`
        : action.payload;
    },
    changeScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export default optionsSlice.reducer;
export const { changeCategory, changeDifficulty, changeType, changeScore } =
  optionsSlice.actions;
