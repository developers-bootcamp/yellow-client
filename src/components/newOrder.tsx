import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useCrud } from '../redux/actions/useCrud';
import { Dispatch } from 'redux';
import { fetchAllOrders } from '../redux/actions/axios';
import { FetchAllOrdersAction } from '../redux/actions/orderAction'
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewOrder: React.FC = () => {
    const { getData, postData, putData } = useCrud();

    const [costumers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [ShoppingCart, setShoppingCart] = useState<object[]>([]);
    const [sumOfPrice, setSumOfPrice] = useState();

    let arr = []
    const getFunc = async (url: string) => {
        let result = await getData(url);
        if (url == "customers")
            setCustomers(result);
        if (url == "products")
            setProducts(result);

    }
    const putFunc = async (url: string, body: object) => {
        let result = await putData(url, body);
        if (url == "buy") {
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
    const addToCart = (product: object) => {
        setShoppingCart((prevCart) => [...prevCart, product])
    }
    useEffect(() => {
        if (!costumers) {
            getFunc("customers")
        }
        if (!products) {
            getFunc("products")

        }
    }, []);

    useEffect(() => {
        if (ShoppingCart) {
            putFunc("orders", ShoppingCart)
        }
    }, [ShoppingCart])

    return (
        <div>
            <ToastContainer />
            {products ?
                products.map((product, index) => (
                    //להציג product
                    <Button variant="text" onClick={() => addToCart(product)}>add item </Button>
                ))
                : <>
                </>}

            {sumOfPrice ?
                <div>
                    price:{sumOfPrice}
                </div>
                : <></>}
            {<Button variant="text" onClick={() => (putFunc("buy", ShoppingCart))}>buy </Button>
            }


        </div>
    );
};

export default NewOrder;
