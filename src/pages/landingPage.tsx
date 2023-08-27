import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";

import { Outlet, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const LandingPage: React.FC = () => {
  const [value, setValue] = React.useState("pendingOrders");
<<<<<<< HEAD
  let navigater = useNavigate()
  // useEffect(() => {
  //   navigater(`landingPage/${value}`)
  // }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigater(`/landingPage/${newValue}`)
=======
  let navigater = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("accessToken") === null){
    navigater("/");
}
  else
    navigater(`/landingPage/${value}`);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigater(`/landingPage/${newValue}`);
>>>>>>> 736483d95c7c0a1e61e294ac2842eb7caea0d18f
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value="pendingOrders" label="Pending Orders" />
        <Tab value="dashboard" label="Dashboard" />
        <Tab value="catalogManager" label="Catalog Manager" />
        <Tab value="usersManagement" label="Users' Management" />
      </Tabs>
      <div>
        <Outlet />
      </div>
    </Box>

  );
};

<<<<<<< HEAD
export default LandingPage




=======
export default LandingPage;
>>>>>>> 736483d95c7c0a1e61e294ac2842eb7caea0d18f
