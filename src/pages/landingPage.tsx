import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const LandingPage: React.FC = () => {
  const [value, setValue] = React.useState("pendingOrders");
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
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab style={{marginRight:"17%"}} value="pendingOrders" label="Pending Orders" />
        <Tab style={{marginRight:"17%"}} value="dashboard" label="Dashboard" />
        <Tab style={{marginRight:"17%"}} value="catalogManager" label="Catalog Manager" />
        <Tab value="usersManagement" label="Users' Management" />
      </Tabs>
      <div>
        <Outlet />
      </div>
    </Box>
  );
};
export default LandingPage;