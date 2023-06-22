import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllOrders } from '../redux/actions/orderAction';
 const LandingPage: React.FC = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Dispatch the fetchAllOrders action when the component mounts
  //   dispatch(fetchAllOrders());//בעיה עם ההחזרה הוא טוען שהוא מחזיר void...
  // }, []);
    return (
      <div>
        <p> landingPage component here</p>
      </div>
    );
  };
  
  export default LandingPage
