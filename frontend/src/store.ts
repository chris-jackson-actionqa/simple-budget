import { configureStore } from "@reduxjs/toolkit";
import { billsReducer } from "./features/bills/billsSlice";
import { incomeReducer } from "./features/income/incomeSlice";

export const store = configureStore({
  reducer: {
    bills: billsReducer,
    income: incomeReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});
