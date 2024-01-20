import classes from "./OrderStatusChart.module.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  BarElement,
} from "chart.js";
import Card from "../../../ui/card/Card";
import Button from "../../../ui/button/Button";


Chartjs.register(
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    BarElement
  );


  export const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    title: {
      display: true,
      text: "Order Status Chart",
    },
    
  };
   

const OrderStatusChat = (props) => {


const delivered = props.delivered 
 const processing = props.processing
 const placed = props.placed  
 
    const data = {
      labels:["Placed","Processing","Delivered"],
      datasets:[
        {
          label:"Order Status Chart",
          data:[placed,processing,delivered],
          borderColor:"rgba(53,162,235)",
          backgroundColor:"rgba(53,162,235,0.4)",
        }
      ]        
    };

  return (
    <Card className={classes.cardClass1}>
      <Bar data={data} options={options} />
      <div className={classes.action}>
        <Button
          className={classes.btn}
          onClick={props.showOrderstatusChartHandler}>
          Toggle
        </Button>
      </div>
    </Card>
  );
};

export default OrderStatusChat;
