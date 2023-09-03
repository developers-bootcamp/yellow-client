import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import GlobalTable from "../components/globalTable";
import { PALLETE } from '../config/config'
import { GridColDef, GridRowId, GridRowModel, GridRowsProp } from "@mui/x-data-grid/models";
import { TextField } from "@mui/material";
import { IUser } from "../types/IUser";


const ROLE = sessionStorage.getItem('role');
const URL = `User`;
let TYPE = '';
const defineColumns = (etitable: boolean) => {
  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Full Name', width: 180, editable: etitable, disableColumnMenu: true },
    {
      field: 'password',
      headerName: 'password',
      type: 'string',
      width: 200,
      renderCell: (params) => (
        <TextField
          type="password"
          value={params.value}
        />
      ),
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 200,
      editable: etitable,
      disableColumnMenu: true
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      editable: etitable,
      type: 'string',
      disableColumnMenu: true
    },
    {
      field: 'telephone',
      headerName: 'Phone',
      width: 200,
      editable: etitable,
      type: 'string',
      disableColumnMenu: true
    },

  ];
  return columns;
}


const UsersManagement: React.FC = () => {


  const { getData, postData, putData, deleteData } = UseCrud();
  const [customers, setCustomers] = useState<GridRowsProp>([]);
  const [employees, setEmployees] = useState<GridRowsProp>([]);
  const [admins, setAdmins] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<GridRowsProp>([]);


  const getUsers = (role: string) => {

    getData(`${URL}/${role}/${page}`)
      .then((data) => {
        switch (role) {
          case 'ADMIN':
            setAdmins(data);
            break;
          case 'EMPLOYEE':
            setEmployees(data);
            break;
          case 'CUSTOMER':
            setCustomers(data);
            break;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getUsers('ADMIN');
    getUsers('EMPLOYEE');
    getUsers('CUSTOMER');
    
  }, []);

  useEffect(() => {
    getUsers(TYPE);
  }, [page]);



  const pageChange = (num: number, type: string) => {
    setPage(num);
    TYPE = type;
  }

  const addUser = (newUser: GridRowModel, type: string) => {
    newUser.role = type;
    postData(URL, newUser)
      .then((data) => {
        console.log(data);
        getUsers(type);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  const updateUser = (user: GridRowModel) => {
    console.log(user);
    putData(URL, user)
      .then((data) => {
        console.log(data);
        getUsers(user.role);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deleteUser = (id: GridRowId, type: string) => {
    deleteData(`${URL}/${id}`)
      .then((data) => {
        console.log(data);
        getUsers(type);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <>
      {admins?.length >= 0 && <GlobalTable
        editable={ROLE === 'ADMIN' ? true : false}
        data={admins}
        title={"Administrators"}
        columns={defineColumns(ROLE === 'ADMIN' ? true : false)}
        color={PALLETE.RED}
        type={"ADMIN"}
        onRowAdded={addUser}
        onRowDeleted={deleteUser}
        onRowUptated={updateUser}
        role={'ADMIN'}
        fetchData={pageChange} rowsCount={0} pageSizeOption={0}></GlobalTable>}

      {employees?.length >= 0 && <GlobalTable
        editable={ROLE !== 'CUSTOMER' ? true : false}
        data={admins}
        title={"Employees"}
        columns={defineColumns(ROLE !== 'CUSTOMER' ? true : false)}
        color={PALLETE.YELLOW}
        type={"EMPLOYEE"}
        onRowAdded={addUser}
        onRowDeleted={deleteUser}
        onRowUptated={updateUser}
        role={'EMPLOYEE'}
        fetchData={pageChange} rowsCount={0} pageSizeOption={0}></GlobalTable>}

      {customers?.length >= 0 && <GlobalTable
        editable={ROLE !== 'CUSTOMER' ? true : false}
        data={admins}
        title={"Customers"}
        columns={defineColumns(ROLE !== 'CUSTOMER' ? true : false)}
        color={PALLETE.BLUE}
        type={"CUSTOMER"}
        onRowAdded={addUser}
        onRowDeleted={deleteUser}
        onRowUptated={updateUser}
        role={'CUSTOMER'}
        fetchData={pageChange} rowsCount={0} pageSizeOption={0}></GlobalTable>}
    </>
  );
};
export default UsersManagement;