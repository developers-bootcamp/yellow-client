import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "order done", "order fale"],
  ["01/23", 100, 40],
  ["02/23", 117, 46],
  ["03/23", 66, 112],
  ["04/23", 103, 54],
];

export const options = {
  title: " Deliver/Cancel Orders",
  curveType: "function",
  legend: { position: "bottom" },
  backgroundColor:"lightGray",

};

export function DeliverCancelOrders () {
    return (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      );
    }