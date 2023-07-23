import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Dialog ,Link} from "@mui/material";
import { Outlet, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OrderDetails from "./orderDetails";
const LandingPage: React.FC = () => {
  const [value, setValue] = React.useState("pendingOrders");
  let navigater = useNavigate()
  // useEffect(() => {
  //   navigater(`/${value}`)
  // }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigater(`/${newValue}`)
  };

  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value}
        onChange={handleChange}
        centered>
        <Tab value="pendingOrders" label="Pending Orders" />
        <Tab value="dashboard" label="Dashboard" />
        <Tab value="catalogManager" label="Catalog Manager" />
        <Tab value="usersManagement" label="Users' Management" />
      </Tabs>
      <Outlet></Outlet>
    </Box>
    <Link onClick={handleClickOpen}>order-details</Link>
    <Dialog onClose={handleClose} fullWidth maxWidth={'md'} open={open} PaperProps={{ sx: { width: "80%", height: "80%", padding: '0', margin: '0' } }}>
            <OrderDetails onClose={handleClose} />

          </Dialog>
    </>
  );
};

export default LandingPage
