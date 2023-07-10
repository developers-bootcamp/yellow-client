import { configureStore } from "@reduxjs/toolkit";
import ordersReducer, { getOrders, getOrdersFinished, getOrdersFailed } from './orderSlice';
export const store = configureStore({
 
  reducer: {
    ordersReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




  


