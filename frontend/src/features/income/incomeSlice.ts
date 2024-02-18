import { createSlice } from "@reduxjs/toolkit";
import INCOME from "../../assets/testData/INCOME";

const initialState = {
  income: INCOME,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    updateIncome: (state, action) => {
      console.log("updateIncome: action.payload", action.payload);
      console.log("updateIncome: state", state);
      state.income = action.payload;
    },
  },
});

export const incomeReducer = incomeSlice.reducer;

export const { updateIncome } = incomeSlice.actions;

export const selectIncome = (state) => {
  return state.income.income;
};
