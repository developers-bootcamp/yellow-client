import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { number } from "yup";
import { IUser} from "../types/IUser";
import ManagmentTable from "../components/managmentTable";
//import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
const URL = `User/0`

const UsersManagement: React.FC = () => {

    const { getData, postData, putData, deleteData } = UseCrud();
    const [customers, setCustomers] = useState<IUser[]>([])
   
    useEffect(() => {
        getData(URL)
        .then((data)=>{
            console.log(data);
            
            setCustomers(data);
        })
        .catch((error) => {
            console.error('Error:', error);
          });

    }, []);





    return (
        <>
   <ManagmentTable/>
        </>
    );
};
export default UsersManagement;