import { BrowserRouter, Route, Routes } from "react-router-dom"
import PendingOrders from "./pendingOrders"
import UsersManagement from "./usersManagement";
import CatalogManager from "./catalogManager";
import Dashboard from "./dashboard";
import LandingPage from "../pages/landingPage";
import Login from "./login";
const Routing: React.FC = () => {



return (
<>
 <BrowserRouter>
   <Routes>
       <Route  path ='/' element={<Login/>}></Route> 
       <Route  path ='/LandingPage' element={<LandingPage></LandingPage>}> 
       <Route  path ='pendingOrders' element={<PendingOrders/>}> </Route>
       <Route  path ='usersManagement' element={<UsersManagement/>}> </Route>
       <Route  path ='CatalogManager' element={<CatalogManager/>}> </Route>
       <Route  path ='Dashboard' element={<Dashboard/>}> </Route>
       </Route> 
   </Routes>
 </BrowserRouter>
</>
)
}
export default Routing;