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

<Link onClick={handleClickOpen}>order-details</Link>
    <Dialog onClose={handleClose} fullWidth maxWidth={'md'} open={open} PaperProps={{ sx: { width: "80%", height: "80%", padding: '0', margin: '0' } }}>
            <OrderDetails onClose={handleClose} />

          </Dialog>
</>
    );
};
export default PendingOrders;