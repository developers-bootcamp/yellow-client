import React from "react";
import Button from '@mui/material/Button';
import { IOrder } from '../types/Iorder';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link,Dialog } from "@mui/material";
import OrderDetails from "./orderDetails/orderDetails";

interface PendingOrdersProps {
    order?: IOrder;
  }
const PendingOrders: React.FC<PendingOrdersProps> = ({ order }) => {
    

    let navigater = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState("64e21292cf0cd64eb4f2497d")
const nav=()=>{
    navigater(`/newOrder`)
}       
 const handleClickOpen = () => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};


    return (<div>
        <Button sx={{ width: 150 }} variant="text" onClick={nav}> new order</Button>
        
        <Link onClick={handleClickOpen}>order-details</Link>
        <Dialog onClose={handleClose} fullWidth maxWidth={'md'} open={open} PaperProps={{ sx: { width: "80%", height: "80%", padding: '0', margin: '0' } }}>
            <OrderDetails onClose={handleClose} id={id} />
        </Dialog>
        <p>pending Orders here</p>
</div>
    );
};
export default PendingOrders;