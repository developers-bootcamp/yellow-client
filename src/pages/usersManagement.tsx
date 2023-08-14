import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { IUser } from "../types/IUser";
import GlobalTable from "../components/globalTable";
import { PALLETE } from '../config/config'
import { GridColDef, GridRowsProp } from "@mui/x-data-grid/models";
import axios from "axios";
//import { GridRowsProp } from "@mui/x-data-grid";


const URL = `User/0`

const UsersManagement: React.FC = () => {

  const { getData, postData, putData, deleteData } = UseCrud();
  const [customers, setCustomers] = useState<GridRowsProp<IUser>>([])

  useEffect(() => {
    getData(URL)
      .then((data) => {
        console.log(data);

        setCustomers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);

  const c: GridRowsProp<IUser> = [
    { id: "1", fullName: "shir", address: "narkis 5", email: "shir@gmail.com", password: "frwx4", telephone: "0506666663" }
  ]
  const cols = [{ field: 'fullName', headerName: 'Full Name' },
  { field: 'password', headerName: 'Password' },
  { field: 'email', headerName: 'Email' },
  { field: 'address', headerName: 'Address' },
  { field: 'telephone', headerName: 'Phone' }
  ]

  const example_for_columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
    },
  ];

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
      width:200 ,
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
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   width: 100,
    //   cellClassName: 'actions',
      // getActions: ({ id }) => {
      //   const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      //   if (isInEditMode) {
      //     return [
      //       <GridActionsCellItem
      //         icon={<SaveIcon />}
      //         label="Save"
      //         sx={{
      //           color: 'primary.main',
      //         }}
      //         onClick={handleSaveClick(id)}
      //       />,
      //       <GridActionsCellItem
      //         icon={<CancelIcon />}
      //         label="Cancel"
      //         className="textPrimary"
      //         onClick={handleCancelClick(id)}
      //         color="inherit"
      //       />,
      //     ];
      //   }

      //   return [
      //     <GridActionsCellItem
      //       icon={<EditIcon />}
      //       label="Edit"
      //       className="textPrimary"
      //       onClick={handleEditClick(id)}
      //       color="inherit"
      //     />,
      //     <GridActionsCellItem
      //       icon={<DeleteIcon />}
      //       label="Delete"
      //       onClick={handleDeleteClick(id)}
      //       color="inherit"
      //     />,
      //   ];
      //  },
    // },
  ];

//  const onAdminUserChanged = (updatedUserDetails, rowNumber) => {
//   await axios(update)
//   users[rowNumber] = 
//  }

  return (
    <>
      <GlobalTable data={c} title="Administrators" color={PALLETE.RED} columns={columns} type="User" /*onRowUpdated={onAdminUserChanged}*//>
      <GlobalTable data={c} title="Employees" color={PALLETE.YELLOW} columns={columns} type="User" />
      <GlobalTable data={c} title="Customers" color={PALLETE.BLUE} columns={columns} type="User" />


    </>
  );
};
export default UsersManagement;