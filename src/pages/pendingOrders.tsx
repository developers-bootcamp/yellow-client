
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
import { Button } from '@mui/material';
import {UseCrud} from "../redux/useCrud"
import { LocalHospitalTwoTone } from '@mui/icons-material';
import { array } from 'yup';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { IpandingOrder } from '../types/Iorder';
import { IOrder } from '../types/Iorder';
import { useEffect, useState } from 'react';
 import '../style/pendingOrders.styles.css';





let orders:IOrder[] = [];

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'products', headerName: 'Products', width:200 },
  { field: 'customer', headerName: 'Customer', width: 200 },


  { field: 'price', headerName: 'Price', width: 70 },
{field: 'status', type: 'string', headerName: 'Status', width: 200,
cellClassName: (params: GridCellParams<any, string>) => {
    if (params.value == null) {
        return '';
    }
    if (params.value == 'approved')
        return 'lightgreen';
    if (params.value == 'cancelled')
        return 'lightcoral';
        if (params.value == 'delivered')
        return 'lightblue';
    return ''
},},





];
const PendingOrders: React.FC = () => {
const {getData}=UseCrud();
const myArray = [1];
let currentRows: any[] = []
const [Rows, setRows] = useState<any[]>([]);
const [Rows2, setRows2] = useState<any[]>([]);




const getOrders = async () => {

    try {


    const config = { headers: { 'Authorization': localStorage.getItem("accessToken")} };
     const ordersStatus =['delivered']
    //  const $a = ['delivered',"charging"]
      const res = await axios.get(`http://localhost:8080/order/delivered/0`,config)
      if (res.status == 200) {
  
        let orders:IOrder[] = [];
          orders=res.data;
        let currentRows: any[] = []

        

          orders.forEach(e => {
          
      
          console.log( e.orderItems);
                let StringPrudocts = ""
                e.orderItems.forEach(prod => {
                    // if (prod.productId != null)
                    console.log( prod.quantity+"qqq");

                    StringPrudocts+= `${prod.quantity} ${prod.productId.name} , `
                        // p += `${prod.quantity} ${prod.IProduct.name}, `

                })
                 
                console.log(e.employee);

                currentRows.push({ id: e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer': e.customer.fullName, 'products': StringPrudocts })
                
                console.log(currentRows);
             //   p="";
              //  console.log(currentRows);
                
          // }
       
          // currentRows.push({ 'id': e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer':e.customer.fullName})
         // console.log(currentRows);
        
        }
        
        )

          setRows2(currentRows)
          
      }
    }
    

    catch (error) {
      alert(error)

    }
  }




  const getOrders2 = async () => {

    try {


    const config = { headers: { 'Authorization': localStorage.getItem("accessToken")} };
     const ordersStatus =['delivered']
      const res = await axios.get(`http://localhost:8080/order/cancelled/0`,config)
      if (res.status == 200) {
  
        let orders:IOrder[] = [];
          orders=res.data;
        let currentRows: any[] = []
          orders.forEach(e => {
          console.log( e.orderItems);
                let StringPrudocts = ""
                e.orderItems.forEach(prod => {
                    console.log( prod.quantity+"qqq");

                    StringPrudocts+= `${prod.quantity} ${prod.productId.name} , `

                })
                 
                console.log(e.employee);

                currentRows.push({ id: e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer': e.customer.fullName, 'products': StringPrudocts })
                
                console.log(currentRows);
        
        }
        
        )

          setRows(currentRows)
          
      }
    }
    

    catch (error) {
      alert(error)

    }
  }

  useEffect(() => {
    getOrders();
    getOrders2();
  }, []);
  return (
<div>

    <DataGrid
            rows ={Rows}
            columns={columns}
        />
        <br>
        </br>
 <DataGrid
            rows ={Rows2}
            columns={columns}
        />

   
    </div>
  );
  }

export default PendingOrders;
















