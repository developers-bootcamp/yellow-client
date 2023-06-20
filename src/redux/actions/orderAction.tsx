import { Dispatch } from 'redux';
import {AnyAction} from 'redux';
import {Order} from "../reducer/orderReducer"
import { GET_ALL_ORDERS_URL } from '../../config/config';
///לבדוק מה הקשר של redux לכאן
// Action types
const FETCH_ALL_ORDERS_REQUEST = 'FETCH_ALL_ORDERS_REQUEST';
const FETCH_ALL_ORDERS_SUCCESS = 'FETCH_ALL_ORDERS_SUCCESS';
const FETCH_ALL_ORDERS_FAILURE = 'FETCH_ALL_ORDERS_FAILURE';

// Action creators
const fetchAllOrdersRequest = () => ({
  type: FETCH_ALL_ORDERS_REQUEST,
});

const fetchAllOrdersSuccess = (orders: Order[]) => ({
  type: FETCH_ALL_ORDERS_SUCCESS,
  payload: orders,
});

const fetchAllOrdersFailure = (error: string) => ({
  type: FETCH_ALL_ORDERS_FAILURE,
  payload: error,
});

export const fetchAllOrders = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchAllOrdersRequest());

    // Make the API call to fetch all orders
    fetch(GET_ALL_ORDERS_URL)
      .then((response) => response.json())
      .then((data) => {
        // Dispatch the success action with the fetched orders
        dispatch<AnyAction>(fetchAllOrdersSuccess(data));
      })
      .catch((error) => {
        // Dispatch the failure action with the error message
        dispatch<AnyAction>(fetchAllOrdersFailure(error.message));
      });
  };
};
