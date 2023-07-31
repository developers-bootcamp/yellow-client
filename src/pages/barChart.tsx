import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { BASE_URL, PALLETE } from '../config/config';
import axios from 'axios';
import swal from 'sweetalert';
import { any } from 'prop-types';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function BarChart() {
  interface ProductAmount {
    productName: string;
    amount:number;
  }
  interface TopProduct {
      month:string;
      MyObjectArray : ProductAmount[];
  }
  const option = {
    indexAxis: 'x' as const, // Set type explicitly to "y"
    elements: {
      bar: {
        borderWidth: 1,
        
      },
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
       position: 'left' as const,
      },
      title: {
        display: true
      },
    },
  };
  const[data1,setData1]:any=useState()
  const [TopProduct, setTopProduct] = useState<any[]>();;
  async function graghRequest() {
    try {
      debugger;
      
       const res=await axios.get(`${BASE_URL}/graph/topProduct`) 
      // console.log(res.data)
      // type TopProduct = TopProduct[];
    
      setTopProduct(res.data)
    //  if(TopProduct!=undefined)
     res.data.forEach((element:any) => {
      console.log(element)
     });
      setData ( {
      
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Product A',
            data: [20, 30, 40],
            backgroundColor:`${PALLETE.ORANGE}`,
          },
          {
            label: 'Product B',
            data: [15, 20, 25],
            backgroundColor: `${PALLETE.RED}`,
          },
          {
            label: 'Product C',
            data: [10, 12, 14],
            backgroundColor: `${PALLETE.GREEN}`,
          },
          {
              label: 'Product D',
              data: [40, 30, 25],
              backgroundColor: `${PALLETE.BLUE}`,
            },
            {
              label: 'Product E',
              data: [15, 30, 18],
              backgroundColor: `${PALLETE.YELLOW}`,
            },
        ],
      
      });
     return res.data
    }
     
      catch (error){
        swal("you have a error", `${error}`, "error");
      }
debugger;
    }
const[data,setData]:any=useState()
// const[arr,setArr]:any=useState()
// const arr=[1,2,3,4]
  useEffect(() => {
    debugger; 
    graghRequest()
   
  }, []);


  return (
    <div  style={{width:'45%',height:'40%',backgroundColor:'rgba(232, 241, 241, 0.963)',borderRadius:'15px'}}>
    {data &&<Bar options={option} data={data} />}
    </div>
  );
}