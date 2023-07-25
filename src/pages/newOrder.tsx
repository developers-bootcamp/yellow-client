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

const NewOrder: React.FC = () => {
   const { getData, postData, putData } = UseCrud();

   const [costumers, setCustomers] = useState<object[]>([]);
   const [products, setProducts] = useState<IProductCategory[]>([]);
   const [ShoppingCart, setShoppingCart] = useState<object[]>([]);
   const [sumOfPrice, setSumOfPrice] = useState();
   const [selectedValue, setSelectedValue] = useState<string | null>(null);

   let arr = []
   const getFunc = async (url: string) => {
      console.log(url);
      let result = await getData(url);
      console.log(result);
      if (url == "User") { }
      setCustomers(result);
      if (url == "categories") {
         console.log(result);
         setProducts(result);
      }

   }
   const postFunc = async (url: string, body: object) => {
      let result = await postData(url, body);
      if (url == "CalculateOrderAmount") {
         try {
            let err = result.message;
            toast.error('An error occurred.');
         }
         catch {
            toast.success('Operation was successful!');
            setSumOfPrice(result)
            //add to the panding order list

         }
      }

   }
   const addToCart = () => {
      let product:any;
      for (let i = 0; i < products.length; i++) {
         if (products[i].desc == selectedValue) {
            product = products[i]
            break;
         }
      }
         console.log("proknjh",product);
         
      setShoppingCart((prevCart) => [...prevCart, product])
   }
   useEffect(() => {
      //   if (costumers.length==0) {         
      //      getFunc("User")
      //   }
      if (products.length == 0) {
         getFunc("categories")
      }
   }, []);

   useEffect(() => {
      if (ShoppingCart) {
         postFunc("order/CalculateOrderAmount", ShoppingCart)
      }
   }, [ShoppingCart])

   return (
      <div>
        <ToastContainer />
        {products ? (
          <>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={products}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.desc}
              onChange={(event, newValue) => setSelectedValue(newValue? newValue.desc : null)}
              renderInput={(params) => <TextField {...params} label="Products" />}
            />
            <Button   sx={{ width: 300 }} variant="text" onClick={addToCart}>add item</Button>
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
    
      </div>
    );
    
};

export default NewOrder;
