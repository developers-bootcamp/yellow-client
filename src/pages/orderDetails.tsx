import React from "react";
import { DialogContent ,CssBaseline} from "@mui/material";
export default function OrderDetails({ onClose }: any){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    return (
<>
<DialogContent style={{ padding: '0' }}>
            <div style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                margin: '0',
                height: '100%'
            }}>
                <CssBaseline />
                <div style={{
                    width: '70%',
                    marginLeft: '100px'
                }} >
                    <h1> Orders' details</h1>
                   <h4>customer</h4>
                   <h4>Product</h4>
                   <button>ADD</button>
                </div>
                <div style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: 'rgb(228, 214, 214)',
                    textAlign: 'center',
                }}>
                    <img style={{
                        width: '90%',
                        height: '50%',
                        marginTop: '40%'
                    }}
                     src="gifts.png" alt="dsf" />
                    <h4 >We are almost done</h4>
                </div>

            </div></DialogContent>
</>
    );
};
// export default OrderDetails;