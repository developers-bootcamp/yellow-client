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
   const [products, setProducts] = useState<IProduct[]>([]);
   const [ShoppingCart, setShoppingCart] = useState<object[]>([]);
   const [sumOfPrice, setSumOfPrice] = useState();
   const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
         if (products[i].name == selectedValue) {
            product = products[i]
            break;
         }
      }
         console.log("proknjh",ShoppingCart);
         
      setShoppingCart((prevCart) => [...prevCart, product])
   }
   useEffect(() => {
      //   if (costumers.length==0) {         
      //      getFunc("User")
      //   }
      if (products.length == 0) {
         getFunc("product");
      }
   }, []);

   useEffect(() => {
      if (ShoppingCart) {
         postFunc("order/CalculateOrderAmount", {"orderItems":ShoppingCart})
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
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => setSelectedValue(newValue? newValue.name : null)}
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
