import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAllOrders } from '../redux/actions/axios';
import {FetchAllOrdersAction } from  '../redux/actions/orderAction'
const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);
  
  return (
    <div>
      <p>landingPage component here</p>
    </div>
  );
};

export default LandingPage;
