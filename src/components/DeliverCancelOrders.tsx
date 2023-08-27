import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { BASE_URL } from "../config/config";



export const options = {
  title: " Deliver/Cancel Orders",
  curveType: "function",
  legend: { position: "bottom" },
  backgroundColor:"lightGray",

};
export function DeliverCancelOrders () {
const [orders, setOrders] = useState<any>([]);

 const graghRequest = async () => {
    await axios.get(`${BASE_URL}/Graph/statusOrder?monthAmount=3`).then(res => setOrders(res.data));

  }

  useEffect(() => {
    debugger;
    graghRequest()

  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);



  // const productsName: string[] = ["Month"];

  // topProduct.map((item) => {
  //   item.products.forEach((product) => {
  //     productsName.push(product.productName);

  //   });
  // });
  // const chartData = orders.map((item:any) => {
  //   const dataRow: any[] = [item.month];
  //   const productMap: { [name: string]: number } = {};

  //   item.products.forEach((product) => {
  //     productMap[product.productName] = product.amount;
  //   });

  //   productsName.forEach((productName) => {
  //     if (productName != "Month") {
  //       const amount = productMap[productName] || 0;
  //       dataRow.push(amount);
  //     }
  //   });

  //   return dataRow;
  // });
   const data = [
  ["Month", "order done", "order fale"],
  ["01/23", 100, 40],
  ["02/23", 117, 46],
  ["03/23", 66, 112],
 
];
const transformDataForChart = () => {
  const months = Object.keys(orders);
  const chartData = [["Month", "order done", "order fail"]];

  months.forEach((month) => {
    const orderData = orders[month];
    const orderFail = orderData[0] || 0;
    const orderDone = orderData[1] || 0;
    chartData.push([month, orderDone, orderFail]);
  });

  return chartData;
};
    return (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={transformDataForChart()}
          options={options}
        />
      );
    }