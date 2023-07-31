import React from "react";
import { Chart } from "react-google-charts";

export function TopSoldProduct() {
  return (

<Chart
          width={"100%"}
          height={"400px"}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Duration", "Photo Album", "Collage","Framed Image","Video Clip","Blessing Card"],
            ["04/23", 20, 38, 15, 30, 20],
            ["05/23", 10, 10, 15, 30, 20],
            ["06/23", 10, 10, 15, 30, 20],
          ]}
          options={{
            chartArea: { width: "50%" },
            isStacked: true,
            vAxis: {
              title: "",
              gridlines: { color: "none" },
              textPosition: "none"
            },
            bars: "vertical",
            backgroundColor: "lightgray",
          }}
      
        />

  );
 }



