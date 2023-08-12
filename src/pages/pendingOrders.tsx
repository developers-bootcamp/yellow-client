import React from "react";
import Button from '@mui/material/Button';
import { IOrder } from '../types/Iorder';
import { Outlet, useNavigate } from 'react-router-dom';

interface PendingOrdersProps {
    order: IOrder|undefined;
  }
const PendingOrders: React.FC<PendingOrdersProps> = ({ order }) => {
    let navigater = useNavigate()
const nav=()=>{
    navigater(`/newOrder`)
}
    return (<div>
        <Button sx={{ width: 150 }} variant="text" onClick={nav}> new order</Button>
        

        <p>pending Orders here</p>
</div>
    );
};
export default PendingOrders;