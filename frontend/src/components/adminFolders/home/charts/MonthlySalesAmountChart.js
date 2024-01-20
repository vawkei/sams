//All whats here for this chart is dummy data, because we have not got data for other months yet{feb-dec}. so i fabricated data to work with here.

import classes from "./MonthlySalesAmountChart.module.css";
import { Chart, Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

import Button from "../../../ui/button/Button";

Chartjs.register(CategoryScale, LinearScale, LineElement, PointElement);

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

const MonthlySalesAmountChart = (props) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Monthly Orders Amount Chart",
        data: [
          10000, 30000, 25000, 40000, 50000, 55000, 24000, 22000, 50000, 15000,
          50000, 50000,
        ],
        borderColor: "rgba(53,162,235)",
        backgroundColor: "rgba(53,162,235,0.4)",
        pointBorderColor: "red",
        pointBorderWidth: 4,
        tension: 0.5,
      },
      {
        label: "Total Monthly Orders Chart",
        data: [
          1000, 3000, 2500, 4000, 5000, 5500, 2400, 220, 5000, 150,
          5000, 5000,
        ],
        borderColor: "rgba(53,162,235)",
        backgroundColor: "rgba(53,162,235,0.4)",
        pointBorderColor: "red",
        pointBorderWidth: 4,
        tension: 0.5,
      }
    ],
  };

  return (
    <div className={classes["monthly-chart"]}>
      <Line data={data} options={options} />
      <div className={classes.action}>
        <Button
          className={classes.btn}
          onClick={props.showMonthlySalesAmountChartHandler}>
          Toggle
        </Button>
      </div>
    </div>
  );
};

export default MonthlySalesAmountChart;
