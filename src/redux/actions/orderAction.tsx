
import {Order} from "../reducer/orderReducer"
import { GET_ALL_ORDERS_URL } from '../../config/config';
// Action types
const FETCH_ALL_ORDERS_REQUEST = 'FETCH_ALL_ORDERS_REQUEST';
const FETCH_ALL_ORDERS_SUCCESS = 'FETCH_ALL_ORDERS_SUCCESS';
const FETCH_ALL_ORDERS_FAILURE = 'FETCH_ALL_ORDERS_FAILURE';

// Action creators
export interface FetchAllOrdersAction {
  type: string;
  payload?: Order[] | string;
}
 export const fetchAllOrdersRequest = (): FetchAllOrdersAction => ({
  type: FETCH_ALL_ORDERS_REQUEST,
});


export const fetchAllOrdersSuccess = (orders: Order[]): FetchAllOrdersAction => ({
  type: FETCH_ALL_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchAllOrdersFailure = (error: string): FetchAllOrdersAction => ({
  type: FETCH_ALL_ORDERS_FAILURE,
  payload: error,
});





