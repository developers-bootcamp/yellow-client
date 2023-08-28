
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { GET_ALL_ORDERS_URL } from '../config/config';
import { Box, Button, Grid } from '@mui/material';
import {UseCrud} from "../redux/useCrud"
import { LocalHospitalTwoTone } from '@mui/icons-material';
import { array } from 'yup';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { IpandingOrder } from '../types/Iorder';
import { IOrder } from '../types/Iorder';
import { useEffect, useState } from 'react';
 import '../style/pendingOrders.styles.css';
 import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
 import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
 import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
 import EmailIcon from '@mui/icons-material/Email';
 import LocalPhoneIcon from '@mui/icons-material/LocalPhone';







let orders:IOrder[] = [];

const columns: GridColDef[] = [

  { field: 'products', headerName: 'Products', width:300 },
  { field: 'customer', headerName: 'Customer', width: 300 },
  {field: 'status', type: 'string', headerName: 'Status', width: 300,
cellClassName: (params: GridCellParams<any, string>) => {
    if (params.value == null) {
        return '';
    }
    if (params.value == 'charging')
        return 'charging';
        if (params.value == 'delivered')
        return 'delivered';
        if (params.value == 'packing')
        return 'packing';
        if (params.value == 'approved')
        return 'approved';
    if (params.value == 'cancelled')
        return 'cancelled';
        if (params.value == 'New')
        return 'New';
    return ''
},},
{ field: 'price', headerName: 'Price', width: 300 },

{ field: 'date', type: 'date',headerName: 'Date', width:200 }





];
const PendingOrders: React.FC = () => {
let currentRows: any[] = []
const [Rows, setRows] = useState<any[]>([]);
const [Rows2, setRows2] = useState<any[]>([]);
const[secondPaginationModel,setsecondPaginationModel]=React.useState({
  page:0,
  pageSize:1,
});
const[firstPaginationModel,setfirstPaginationModel]=React.useState({
  page:0,
  pageSize:1,
});
const getOrders = async () => {

    try {


    const config = { headers: { 'Authorization': localStorage.getItem("accessToken")} };
     const ordersStatus =['cancelled']
     console.log(firstPaginationModel.page+"first");

      const res = await axios.get(`${GET_ALL_ORDERS_URL}/${ordersStatus}/${firstPaginationModel.page}`,config)
      if (res.status == 200) {
  
        let orders:IOrder[] = [];
        orders=res.data;
        let currentRows: any[] = []

        

          orders.forEach(e => {
                let AllPrudocts = ""
                e.orderItems.forEach(p => {

                   AllPrudocts+= `${p.quantity} ${p.productId.name} , `


                })
                console.log(e.customer);
                
                currentRows.push({ id: e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer': e.customer.fullName , 'products': AllPrudocts,'date':new Date(e.auditData.createDate)  })
        }
        
        )

          setRows(currentRows)
          
      }
    }
    

    catch (error) {
      alert(error);

    }
  }




  const getOrders2 = async () => {

    try {

    const config = { headers: { 'Authorization': localStorage.getItem("accessToken")} };
     const ordersStatus =['approved','delivered','charging','packing','New',]
     console.log(secondPaginationModel.page+"second");

     const res = await axios.get(`${GET_ALL_ORDERS_URL}/${ordersStatus}/${secondPaginationModel.page}`,config)
     if (res.status == 200) {
  
        let orders:IOrder[] = [];
          orders=res.data;
        let currentRows: any[] = []
          orders.forEach(e => {
                let AllPrudocts = ""
           
                e.orderItems.forEach(p=> {

                  AllPrudocts+= `${p.quantity} ${p.productId.name} , `


                })



                currentRows.push({ id: e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer': e.customer.fullName, 'products': AllPrudocts ,'date':new Date(e.auditData.createDate) 


              })
                
        
        }
        
        )

          setRows2(currentRows)
          
      }
    }
    

    catch (error) {
      alert(error)

    }
  }
  const getOrdersDeatails =  () =>{
   getOrders();
    getOrders2();
  }
    

  

  useEffect(() => {

    //getOrdersDeatails();
    getOrders2();
    getOrders();

  }, [secondPaginationModel,firstPaginationModel]);
  return (
<div>

     

     
     
    


     
 

     <Box
            sx={{
              height: '30%',
              marginLeft:'10%',
              width: '80%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >

      
               <Button
                   
                   style={{
                       backgroundColor: ` rgb(235,159,110)`,
                       color: `white`,
                      }}
                    >
                   New order
                    </Button>
                    <Button     type="submit"  style={ {backgroundColor: `white`}  }><FilterAltOutlinedIcon></FilterAltOutlinedIcon> filter  </Button>
   
                    <Button><SortOutlinedIcon> </SortOutlinedIcon> sort </Button>
                    <br></br>
                    <br></br>

                    <ArrowCircleDownIcon style={{ color: 'rgb(238,105,106)', paddingLeft: '7px' }}></ArrowCircleDownIcon>
            <span style={{ color: 'rgb(238,105,106)', padding: '7px', verticalAlign: 'super' }}>{"Top priority"}</span>
             <br></br>

        <DataGrid style={
            {backgroundColor: `rgb(231,230,230) `, border: '1px solid white'} 
    
            // border: 1px solid white;
            // border-collapse: collapse;
         
           }
                 rows ={Rows}
                 columns={columns}
                 rowCount={7}
                 paginationModel={firstPaginationModel}
                 paginationMode="server"
                 onPaginationModelChange={setfirstPaginationModel}
          
             /> 
<br></br>
<br></br>        
<DataGrid style={
            {backgroundColor: `rgb(231,230,230) `, border: '1px solid white'} 
           }
            rows ={Rows2}
            columns={columns}
                   rowCount={1}
                paginationModel={secondPaginationModel}
                paginationMode="server"
                onPaginationModelChange={setsecondPaginationModel}
        />

              </Box>







   
    </div>
  );
  }

export default PendingOrders;
















