import { BrowserRouter, Route, Routes } from "react-router-dom"
import PendingOrders from "./pendingOrders"
import NavTabs from "./navTabs";
import UsersManagement from "./usersManagement";
import CatalogManager from "./catalogManager";
import Dashboard from "./dashboard";
import NewOrder from "./newOrder";
import LandingPage from "./landingPage";
import SignUp from "./SignUp";
import Login from "./login";
const Routing: React.FC = () => {



return (
<>
 <BrowserRouter>
   <Routes>
       <Route  path ='/' element={<NavTabs></NavTabs>}>
       <Route  path ='login' element={<Login/>}> </Route> 
       <Route  path ='pendingOrders' element={<PendingOrders/>}> </Route>
       <Route  path ='usersManagement' element={<UsersManagement/>}> </Route>
       <Route  path ='CatalogManager' element={<CatalogManager/>}> </Route>
       <Route  path ='Dashboard' element={<Dashboard/>}> </Route>
       <Route  path ='newOrder' element={<NewOrder/>}> </Route>
       {/* <Route  path ='landingPage' element={<LandingPage/>}> </Route> */}
       <Route  path ='signUp' element={<SignUp/>}> </Route>


      </Route>
   </Routes>
 </BrowserRouter>
</>
)
}
export default Routing;