import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { IUser } from "../types/IUser";
import GlobalTable from "../components/globalTable";
import { PALLETE } from '../config/config'
import { GridColDef, GridRowsProp } from "@mui/x-data-grid/models";
import axios from "axios";



const URL = `User/0`

const UsersManagement: React.FC = () => {

  const { getData, postData, putData, deleteData } = UseCrud();
  const [users, setUsers] = useState<GridRowsProp<IUser>>([]);

  useEffect(() => {
    getData(URL)
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Full Name', width: 180, editable: true },
    {
      field: 'password',
      headerName: 'Password',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 200,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      editable: true,
      type: 'string',
    },
    {
      field: 'telephone',
      headerName: 'Phone',
      width: 200,
      editable: true,
      type: 'string',
    },

  ];

  //  const onAdminUserChanged = (updatedUserDetails, rowNumber) => {
  //   await axios(update)
  //   users[rowNumber] = 
  //  }

  return (
    <>
      {users?.length > 0 && <GlobalTable data={users.filter(user => user.role === "ADMIN")} title="Administrators" color={PALLETE.RED} columns={columns} type="User" editable={true}/*onRowUpdated={onAdminUserChanged}*/ />}
      {users?.length > 0 && <GlobalTable data={users.filter(user => user.role === "EMPLOYEE")} title="Employees" color={PALLETE.YELLOW} columns={columns} type="User" editable={true} />}
      {users?.length > 0 && <GlobalTable data={users.filter(user => user.role === "CUSTOMER")} title="Customers" color={PALLETE.BLUE} columns={columns} type="User" editable={false} />}
    </>
  );
};
export default UsersManagement;