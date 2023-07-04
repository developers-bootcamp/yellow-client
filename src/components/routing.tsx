import { BrowserRouter, Route, Routes } from "react-router-dom"
import PendingOrders from "./pendingOrders"
import UsersManagement from "./usersManagement";
import CatalogManager from "./catalogManager";
import Dashboard from "./dashboard";


import LandingPage from "../pages/landingPage";
import NewOrder from "./newOrder";




import SignUp from "./SignUp";
import Login from "./login";
const Routing: React.FC = () => {



return (
<>
 <BrowserRouter>
   <Routes>
       
       <Route  path ='/' element={<Login/>}> </Route> 
       <Route  path ='/LandingPageand' element={<LandingPage/>}>
       <Route  path ='pendingOrders' element={<PendingOrders/>}> </Route>
       <Route  path ='usersManagement' element={<UsersManagement/>}> </Route>
       <Route  path ='CatalogManager' element={<CatalogManager/>}> </Route>
       <Route  path ='Dashboard' element={<Dashboard/>}> </Route>
       <Route  path ='newOrder' element={<NewOrder/>}> </Route>
       {/* <Route  path ='landingPage' element={<LandingPage/>}> </Route> */}
       <Route  path ='signUp' element={<SignUp/>}> </Route>


      </Route>
      <Route  path ='newOrder' element={<NewOrder/>}> </Route>
      <Route  path ='signUp' element={<SignUp/>}> </Route>
   </Routes>
 </BrowserRouter>
</>
)
}
export default Routing;