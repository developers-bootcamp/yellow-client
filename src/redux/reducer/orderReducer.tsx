import { Reducer } from 'react';

export interface Order {
    costumer:string,
    product:string

}

interface OrdersState {
  orders: Order[];
  errorMessage: string;
  shouldDisplayErrorMessage: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: OrdersState = {
  orders: [],
  errorMessage: '',
  shouldDisplayErrorMessage: false,
};

const ordersReducer: Reducer<OrdersState, Action> = (state, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default ordersReducer;
