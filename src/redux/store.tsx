import { configureStore } from "@reduxjs/toolkit";
import ordersReducer, { getOrders, getOrdersFinished, getOrdersFailed } from './orderSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
 
  reducer: {
    ordersReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


  


