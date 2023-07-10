import { AppDispatch } from '../redux/store' 
import { UseCrud } from '../redux/useCrud';
import ordersReducer, { getOrders, getOrdersFinished, getOrdersFailed } from '../redux/orderSlice';


  
export const getAllOrders = () => {
    
const { getData, postData, putData } = UseCrud();

  return async (dispatch: AppDispatch) => {
    try {
      let orders =  await getData("orders");
      dispatch( getOrders(orders))
    }
    catch (error) {
      dispatch(getOrdersFailed())
    }
  }
}