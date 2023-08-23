

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { UseCrud } from '../../redux/useCrud';
import { Dispatch } from 'redux';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProduct } from '../../types/Iorder';
import { IProductCategory } from '../../types/Iorder';
import { IOrderItems } from '../../types/Iorder';
import { IOrder } from '../../types/Iorder';
import { IUsers } from '../../types/Iorder';
import PendingOrders from "../../pages/pendingOrders"
import { getAllOrders } from "../../redux/dispatch"
import { Formik, Form, Field, ErrorMessage } from "formik";
import Grid from '@mui/material/Grid'; // Grid version 1
import InputLabel from '@mui/material/InputLabel';
import { elementAcceptingRef } from '@mui/utils';
import { keys } from '@mui/system';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { log } from 'console';
import { useNavigate } from 'react-router-dom';
import NewOrderModel from './NewOrderModel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { number } from 'yup';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const NewOrder: React.FC = () => {
   const { getData, postData, putData, deleteData } = UseCrud();
   const [costumers, setCustomers] = useState<IUsers[]>([]);
   const [user, setUser] = useState<IUsers>();

   const [currency, setCurrency] = useState<string[]>([]);
   const [products, setProducts] = useState<IProduct[]>([]);
   const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);
   const [sumOfPrice, setSumOfPrice] = useState<any>(0);
   const [selectedValueProduct, setSelectedValueProduct] = useState<string | null>(null);
   const [selectedValueCostumer, setSelectedValueCostumer] = useState<string | null>(null);

   const [quantity, setQuantity] = useState<number>(1);
   const [order, setOrder] = useState<IOrder>();
   const [productResult, setProductResult] = useState<object[]>([]);
   const [orderIsReady, setOrderIsReady] = useState(0);
   const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(null);
   const navigate = useNavigate();

   let arr = []
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [currencyMap, setCurrencyMap] = useState<string>("SHEKEL");

   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const handleMenuItemClick = (text: string) => () => {
      setSelectedMenuItem(text);
      setAnchorEl(null);
   };
   const getFunc = async (url: string) => {

      let result = await getData(url);
      if (url == "User/0") {  
         setCustomers(result); }
    
      if (url == "product") {
         setProducts(result);
      }
      // if (url == "User/") {
      //    setUser(result);
      // }
      if (url == "GetCurrency") {
         setCurrency(result);
      }
   }
   const postFunc = async (url: string, body: object) => {
      let result = await postData(url, body);
      if(url=="order")
         return;
      setProductResult(result);
      if (url === "order/CalculateOrderAmount") {
         let val = result[-1];
         const targetValue = -1;

         const targetKey = Object.keys(val).find((key) => val[key] === targetValue);
         setSumOfPrice(targetKey);

      }

   }
   const getAmount = (name:string,ammount:number ) => {
      let product: any;
      for (let i = 0; i < products.length; i++) {
         if (products[i].name == name) {
            product = products[i]
            break;
         }
      } 
      const id:string = product.id;  
      const updatedOrderItems = orderItems.map(item => {
         if (item.productId.id == id) {
           // Update the amount for the specific product
           return {...item ,amount:ammount};
         } else {
           return item;
         }
       });

       setOrderItems(updatedOrderItems);
       return ammount;
   }
   const addToCart = () => {
      let product: any;
      for (let i = 0; i < products.length; i++) {
         if (products[i].name == selectedValueProduct) {
            product = products[i]
            break;
         }
      }
      product = { "productId": product, "quantity": quantity,"ammount":"" };
      setOrderItems((prevCart) => [...prevCart, product])
   }
   const buyNow = () => {
      let product: any;
      console.log(order?.cvc , order?.expiryOn , order?.creditCardNumber);
      
      if (order?.cvc && order?.expiryOn && order?.creditCardNumber) {
         console.log(order);
         postFunc("order",order);
         navigate('/pendingOrders', { state: { order: order } });
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
         setQuantity(parseInt(lable));
      if (type == "credit card number") {

         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            creditCardNumber: lable,
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
      setOrder((prevOrder: any) => ({
         ...prevOrder,
         totalAmount: sumOfPrice,
         customer: user,
         orderItems: orderItems,
         orderStatusId:"approved"
      }));
   };
   useEffect(() => {
      if (selectedMenuItem == "DOLLAR") {
         setCurrencyMap(selectedMenuItem);
      }

   }, [selectedMenuItem])

   useEffect(() => {
      if (costumers.length == 0) {
         getFunc("User/0")
      }
      if (products.length == 0) {
         getFunc("product");
      }
      if (currency.length == 0) {
         getFunc("GetCurrency");
      }
   }, []);

   useEffect(() => {
      interface ICalculateOrder {
         currency: string;
         orderItems: IOrderItems;
         customer:IUsers
      }
      //let a:ICalculateOrder={currency:currencyMap,orderItems:orderItems,customer:user};
      postFunc("order/CalculateOrderAmount", { orderItems });

   }, [orderItems])

   // useEffect(() => {
   //    // Automatically update the amounts when orderItems or products change
   //    updateAmountsAutomatically();
   //  }, [orderItems]);
   // useEffect(() => {

   //    getFunc("User/");

   // }, [selectedValueCostumer])
   return (
      <div>
         <Paper
            sx={{
               p: 2,
               margin: 'auto',
               maxWidth: 750,
               flexGrow: 1,
               backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
         >  
         <NewOrderModel title={"New Order"} img={"gifts.png"} txtSide={"We are almost done"}
         >
               {
                  <>
                     {currency ? <>
                        <div>
                           <Button
                              id="fade-button"
                              aria-controls={open ? 'fade-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                           >
                              Currency
                           </Button>
                           <Menu
                              id="fade-menu"
                              MenuListProps={{
                                 'aria-labelledby': 'fade-button',
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              TransitionComponent={Fade}
                           >
                              {currency.map((i) => (
                                 <MenuItem key={i} onClick={handleMenuItemClick(i)}>
                                 {i}
                              </MenuItem>
                             
                              ))}
                           </Menu>
                        </div>
                     </> : <></>}
                     <br></br>
                     <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={costumers}
                        sx={{ width: 250 }}
                        getOptionLabel={(option) => option.fullName}
                        onChange={(event, newValue) => setSelectedValueCostumer(newValue ? newValue.fullName : null)}
                        renderInput={(params) => <TextField {...params} label="costumers" />}
                     />
                     <br></br>
                     <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={products}
                        sx={{ width: 250 }}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => setSelectedValueProduct(newValue ? newValue.name : null)}
                        renderInput={(params) => <TextField {...params} label="Products" />}
                     />
                     <br></br>
                     <TextField label="quantity" sx={{ width: 250 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("quantity", e) }} />
                     <div style={{ position: 'absolute', top: 150, right: 700 }}>
                        price: {sumOfPrice } 
                     </div>
                     {

                        <Button sx={{ width: 250 }} variant="text" onClick={addToCart}> add</Button>

                     }
                     {productResult ? (
                        <Grid item style={{ position: 'absolute', top: 200, right: 650 }}>

                           <p>products list:</p>
                           {delete productResult[-1]}
                           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', top: 200, right: 650 }}>
                              {Object.entries(productResult).map(([i, innerObj], index) => (
                                 <div key={index} style={{ display: 'flex', width: '100%', top: 300, right: 650 }}>
                                    <p >{i}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', top: 300, right: 600 }}>
                                       {Object.entries(innerObj).map(([subKey, value], subIndex) => (
                                          <div key={subIndex} style={{ display: 'flex', top: 200, right: 450 }}>
                                             <p>-{value } {subKey} </p>
                                             <Button><DeleteIcon onClick={() => { Delete(index) }} /></Button>
                                             {/* {getAmount(i,parseInt(subKey))}  */}

                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              ))}
                           </div>


                        </Grid>

                     ) : (
                        <></>
                     )}
                     <br></br>
                     <br></br>
                     <br></br>



                     <TextField label="credit card number" sx={{ width: 250 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("credit card number", e) }} />
                     <br></br>
                     <br></br>

                     <div style={{ display: 'flex', alignItems: 'center' }}>
                        <br></br>

                        <TextField
                           label="expiers on"
                           sx={{ width: 120, textAlign: 'left', marginRight: '10px' }}
                           inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleInputChange("expiers on", e);
                           }}
                        />
                        <br></br>
                        <TextField
                           label="cvc"
                           sx={{ width: 120, textAlign: 'left' }}
                           inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleInputChange("cvc", e);
                           }}
                        />
                     </div>


                     <br></br>
                     <Button sx={{ width: 250 }} variant="text" onClick={buyNow}> buy</Button>

                  </>
               }


</NewOrderModel>
         </Paper>
      </div>
   );

};
export default NewOrder ;   