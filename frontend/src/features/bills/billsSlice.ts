import { createSlice } from "@reduxjs/toolkit";
import TESTBILLS from "../../assets/testData/TESTBILLS";
import { Bill } from "../../common/types";

const initialState = {
  billsArray: TESTBILLS,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      const { billsArray } = state;
      const { payload: newBill } = action;
      const highestId = billsArray.reduce((highestId, bill) => {
        return bill.id > highestId ? bill.id : highestId;
      }, 0);
      newBill.id = highestId + 1;
      billsArray.push(newBill);
    },
    removeBill: (state, action) => {
      state.billsArray = state.billsArray.filter(
        (bill) => bill.id !== action.payload
      );
    },
    updateBill: (state, action) => {
      const { billsArray } = state;
      const { payload: updatedBill } = action;
      console.log("updatedBill", updatedBill);
      const billIndex = billsArray.findIndex(
        (bill) => bill.id === updatedBill.id
      );
      console.log("billIndex", billIndex);
      billsArray[billIndex] = updatedBill;
    },
  },
});

export const billsReducer = billsSlice.reducer;

export const { addBill, removeBill, updateBill } = billsSlice.actions;

export const selectBills = (state) => state.bills.billsArray;
export const selectBillById = (billId: number) => (state) =>
  state.bills.billsArray.find((bill: Bill) => bill.id === billId);
