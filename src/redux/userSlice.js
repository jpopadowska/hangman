import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWord: "",
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setCurrentWord, setUserName } = userSlice.actions;

export default userSlice.reducer;
