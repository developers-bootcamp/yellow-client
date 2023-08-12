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
import { IUsers } from '../types/Iorder';
import PendingOrders from "./pendingOrders"
import { getAllOrders } from "../redux/dispatch"
import { Formik, Form, Field, ErrorMessage } from "formik";
import Grid from '@mui/material/Grid'; // Grid version 1
import InputLabel from '@mui/material/InputLabel';
import { elementAcceptingRef } from '@mui/utils';
import { keys } from '@mui/system';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { log } from 'console';
import  {useNavigate }  from 'react-router-dom';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const NewOrder: React.FC = () => {
   const { getData, postData, putData, deleteData } = UseCrud();

   const [costumers, setCustomers] = useState<IUsers[]>([]);
   const [products, setProducts] = useState<IProduct[]>([]);
   const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);
   const [sumOfPrice, setSumOfPrice] = useState<any>(0);
   const [selectedValue, setSelectedValue] = useState<string | null>(null);
   const [quantity, setQuantity] = useState<string>();
   const [order, setOrder] = useState<IOrder>();
   const [productResult, setProductResult] = useState<object[]>([]);
   const [orderIsReady, setOrderIsReady] = useState(0);
   const navigate = useNavigate ();

   let arr = []

   const getFunc = async (url: string) => {

      let result = await getData(url);
      if (url == "User") { }
      setCustomers(result);
      if (url == "product") {
         setProducts(result);
      }

   }
   const postFunc = async (url: string, body: object) => {
      let result = await postData(url, body);
      setProductResult(result);
      if (url === "order/CalculateOrderAmount") {
         let val = result[-1];
         const targetValue = -1;

         const targetKey = Object.keys(val).find((key) => val[key] === targetValue);
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
   const buyNow = () => {
      let product: any;
      setOrder((prevOrder: any) => ({
         ...prevOrder,
         customer: costumers,
      }));
      setOrder((prevOrder: any) => ({
         ...prevOrder,
         totalAmount: sumOfPrice,
      }));
      setOrder((prevOrder: any) => ({
         ...prevOrder,
         totalAmount: sumOfPrice,
      }));
      setOrder((prevOrder: any) => ({
         ...prevOrder,
         orderItems: orderItems,
      }));

      if (order?.cvc! && order?.expiryOn && order?.CreditCardNumber)
       {
            navigate('/pendingOrders', { state: { order:order} });
        }; 
   }
   const Delete = (i: number) => {
      setOrderItems(prevOrderItems => {
          const updatedItems = prevOrderItems.filter((_, index) => index !== i);
          return updatedItems;
      });
  };
  
   const handleInputChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const lable = event.target.value;
      if (type == "quantity")
         setQuantity(lable);
      if (type == "credit card number") {

         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            CreditCardNumber: lable,
         }));
      }
      if (type == "expiers on") {

         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            expiryOn: lable,
         }));
      }
      if (type == "cvc") {

         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            cvc: lable,
         }));
      }


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
              
         postFunc("order/CalculateOrderAmount", { orderItems });
     
   }, [orderItems])

   return (
      
         <div>
            <Grid
               container spacing={2}
               direction="column"
               justifyContent="center"
               alignItems="center">
               {products ? (
                  <>



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
                     <TextField label="quantity" sx={{ width: 300 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("quantity", e) }} />

                     <Button sx={{ width: 300 }} variant="text" onClick={addToCart}> add</Button>
                     {
                        <div>
                           price: {sumOfPrice}
                        </div>
                     
                     }
                     {productResult ? (
                        <Grid display='flex' justifyContent='left' alignItems="left" >

                           <p>products list:</p>
                           {delete productResult[-1]}
                           {Object.entries(productResult).map(([i, innerObj], index) => (
                              <div key={index} style={{ width: '100%' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <p>{i}</p>
                                    {Object.entries(innerObj).map(([subKey, value], subIndex) => (
                                       <>
                                          <p key={subIndex} style={{ marginLeft: '10px' }}>
                                             -{value}  {subKey}
                                          </p>

                                          <Button><DeleteIcon onClick={()=>{Delete(index)}} /></Button>
                                       </>
                                    ))}
                                 </div>
                              </div>
                           ))}

                        </Grid>
                     ) : (
                        <></>
                     )}





                     <TextField label="credit card number" sx={{ width: 300 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("credit card number", e) }} />
                     <br></br>
                     <TextField label="expiers on" sx={{ width: 150, textAlign: 'left' }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("expiers on", e) }} />
                     <br></br>
                     <TextField label="cvc" sx={{ width: 150, textAlign: 'write' }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("cvc", e) }} />
                     <br></br>
                     <Button sx={{ width: 300 }} variant="text" onClick={buyNow}> buy</Button>

                  </>
               ) : (
                  <>
                  </>
               )}

            </Grid>
         </div>
   );

};

export default NewOrder;
