import React from "react";
import { DialogContent } from "@mui/material";
import { useEffect, useState, useRef } from 'react';
import { CssBaseline } from "@mui/material";
import { UseCrud } from "../redux/useCrud";
import { IOrder } from "../types/Iorder";
export default function OrderDetails({ onClose, id }: any) {
    const [order, setOrder] = useState<IOrder>();
    const { getData, postData, putData, deleteData } = UseCrud();

    const getFunc = async (url: string) => {
        let result = await getData(url);
        setOrder(result);
    }
    useEffect(() => {
        getFunc(`order/${id}`)
    }, []);


    return (

        <>
            <DialogContent style={{ padding: '0' }}>
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    width: '100%',
                    margin: '0',
                    height: '100%'
                }}>
                    <CssBaseline />
                    <div style={{
                        width: '70%',
                        marginLeft: '100px'
                    }} >
                        <h1> Orders' details</h1>
                        <h4>customer</h4>
                        <label>{order?.customer.fullName}</label>
                        <h4>product</h4>
                        <label>{order?.customer.fullName}</label>
                        <h4>price</h4>
                        <label>{order?.totalAmount}</label>
                    </div>
                    <div style={{
                        width: '15%',
                        height: '100%',
                        backgroundColor: 'rgb(228, 214, 214)',
                        textAlign: 'center',
                    }}>
                        <img style={{
                            width: '90%',
                            height: '50%',
                            marginTop: '40%'
                        }}
                            src="gifts.png" alt="dsf" />
                        <h4 >we almost done</h4>
                    </div>

                </div></DialogContent>
        </>

    );
}
