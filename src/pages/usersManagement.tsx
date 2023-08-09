import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { IUser} from "../types/IUser";
import GlobalTable from "../components/globalTable";
import {PALLETE} from '../config/config'
  

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

const c:IUser[]=[
  {id:"1",fullName:"shir",address:"narkis 5",email:"shir@gmail.com",password:"frwx4",telephone:"0506666663"}
]
    const cols = [{ field: 'fullName', headerName: 'Full Name' },
    { field: 'password', headerName: 'Password' },
    { field: 'email', headerName: 'Email' },
    { field: 'address', headerName: 'Address' },
    { field: 'telephone', headerName: 'Phone' }
]

    return (
        <>
   <GlobalTable data={c} title="Customers" color={PALLETE.BLUE} columns={cols} type="User"/>
        </>
    );
};
export default UsersManagement;