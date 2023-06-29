import { Dispatch } from 'redux';
import {AnyAction} from 'redux';
import axios, { AxiosResponse } from 'axios'; 
import { GET_ALL_ORDERS_URL } from '../../config/config'; 
import { FetchAllOrdersAction, fetchAllOrdersFailure, fetchAllOrdersRequest, fetchAllOrdersSuccess } from './orderAction';
export const fetchAllOrders = () => {
    return (dispatch: Dispatch<FetchAllOrdersAction>) => {
      dispatch(fetchAllOrdersRequest());
      axios.get(GET_ALL_ORDERS_URL)
        .then((response) => {
          dispatch(fetchAllOrdersSuccess(response.data));
        })
        
        .catch((error) => {
          dispatch(fetchAllOrdersFailure(error.message));
        });
      }; 
      
  };
 