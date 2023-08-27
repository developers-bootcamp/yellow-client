import { generateKey } from "crypto";
import React from "react";
import { Chart } from "react-google-charts";
import blue from '@mui/material/colors/blue';
import { redirect } from "react-router-dom";
import styled from "@emotion/styled";


export const data = [
  ["emploeey", "orders"],
  ["Michal", 11],
  ["Oren", 2],
  ["Helena", 2],
  ["Dave", 2],
  ["Eli", 7],
];



export const options = {
backgroundColor:"lightGray"
};

export default function TopEmploeey() {
  return (
    <Chart  
      chartType="PieChart"
      data={data}
     options={options}
      width={"100%"}
      height={"400px"}
      
    />
  );
}