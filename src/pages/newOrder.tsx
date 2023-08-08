import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { UseCrud } from '../redux/useCrud';
import { Dispatch } from 'redux';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProduct } from '../types/Iorder';
import { IProductCategory } from '../types/Iorder';
import { IOrderItems } from '../types/Iorder';
import { IOrder } from '../types/Iorder';
import { getAllOrders } from "../redux/dispatch"
import { Formik, Form, Field, ErrorMessage } from "formik";
import Grid from '@mui/material/Grid'; // Grid version 1
import InputLabel from '@mui/material/InputLabel';

const NewOrder: React.FC = () => {
   const { getData, postData, putData, deleteData } = UseCrud();

   const [costumers, setCustomers] = useState<object[]>([]);
   const [products, setProducts] = useState<IProduct[]>([]);
   const [orderItems, setOrderItems] = useState<object[]>([]);
   const [sumOfPrice, setSumOfPrice] = useState <any> (0);
   const [selectedValue, setSelectedValue] = useState<string | null>(null);
   const [quantity, setQuantity] = useState(0);

   let arr = []
   const getFunc = async (url: string) => {
      let result = await getData(url);
      console.log(result);

      if (url == "User") { }
      setCustomers(result);
      if (url == "product") {
         setProducts(result);
      }

   }
   const postFunc = async (url: string, body: object) => {
      let result = await postData(url, body);
      console.log("result", result);

      if (url === "order/CalculateOrderAmount") {
       let val= result [-1];
       const targetValue = -1;

       const targetKey = Object.keys(val).find((key) => val[key] === targetValue);
       console.log(targetKey);
       setSumOfPrice(targetKey); 
         
       }

   }
   const addToCart = () => {
      let product: any;
      for (let i = 0; i < products.length; i++) {
         if (products[i].name == selectedValue) {
            product = products[i]
            break;
         }
      }
      product = { "productId": product, "quantity": quantity };
      setOrderItems((prevCart) => [...prevCart, product])
   }
   const handleInputChange = (event:any) => {
      const amount = event.target.value;
      setQuantity(amount);
    };
   useEffect(() => {
      //   if (costumers.length==0) {         
      //      getFunc("User")
      //   }
      if (products.length == 0) {
         getFunc("product");
      }
   }, []);

   useEffect(() => {
      if (orderItems.length > 0) {
         postFunc("order/CalculateOrderAmount", { orderItems });
      }
   }, [orderItems])

   return (
      <div>
         <Grid
          container spacing={2}
          direction ="column"
          justifyContent="center"
          alignItems="center">

         <ToastContainer />
         {products ? (
            <>
                     
                    { getAllOrders()}

               <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={products}
                  sx={{ width: 300 }}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => setSelectedValue(newValue ? newValue.name : null)}
                  renderInput={(params) => <TextField {...params} label="Products" />}
               />
               <br></br>
               <TextField    label="quantity" sx={{ width: 300 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  onChange={handleInputChange} />


             <Button sx={{ width: 300 }} variant="text" onClick={addToCart}> add</Button>
            </>
         ) : (
            <>
            </>
         )}
         {sumOfPrice ? (
            <div>
               price: {sumOfPrice}
            </div>
         ) : (
            <></>
         )}
</Grid>
      </div>
   );

};

export default NewOrder;
