import { Dialog ,Link} from "@mui/material";
import React from "react";
import OrderDetails from "./orderDetails";

const PendingOrders: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
<>


        <p>pending Orders here</p>
</>
    );
};
export default PendingOrders;