import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAllOrders } from '../redux/actions/axios';
import {FetchAllOrdersAction } from  '../redux/actions/orderAction'
import NewOrder from './newOrder';
import { Button } from '@mui/material';

const LandingPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);
  
  return (
    <div>
     <Button variant="text" onClick={()=> navigate('/newOrder')}> הזמנה חדשה</Button>
    </div>
  );
};

export default LandingPage;
