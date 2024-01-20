import classes from "./WeekDaysSalesAmountChart.module.css";

import { Line } from "react-chartjs-2";
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
    text: "Last 5 days Total Order",
  },
};   

const LastFiveDaysOrderChart = (props) => {

  const day1 = props.currentDate.toDateString();
  const day2 = props.day2.toDateString();
  const day3 = props.day3.toDateString();
  const day4 = props.day4.toDateString();
  const day5 = props.day5.toDateString();

  const day_1 = props.currentDay;
  const day_2 = props.day_2;
  const day_3 = props.day_3;
  const day_4 =props.day_4;
  const day_5 = props.day_5;

  const oni = props.oni;
  const anor = props.anor;
  const ijeta = props.ijeta;
  const ijerin = props.ijerin;
  const ijarun  =props.ijarun;

    const data = {
      labels:[day1,day2,day3,day4,day5],
      datasets:[
        {
          label:"Last 5 days Total Orders",
          data:[day_1,day_2,day_3,day_4,day_5],
          borderColor:"rgba(53,162,235)",
          backgroundColor:"rgba(53,162,235,0.4)",
          pointBorderColor: "red",
          pointBorderWidth: 4,
          tension: 0.5,
        },
        {
          label:"Last 5 days Total Order Amount",
          data:[oni,anor,ijeta,ijerin,ijarun],
          borderColor:"rgba(53,162,235)",
          backgroundColor:"rgba(53,162,235,0.4)",
          pointBorderColor: "red",
          pointBorderWidth: 4,
          tension: 0.5,
        }
      ]        
    };

  return (
    <div className={classes["week-days-chart"]}>
      <Line data={data} options={options} />
      <div className={classes.action}>
        <Button
          className={classes.btn}
          onClick={props.showOrderstatusChartHandler}>
          Toggle
        </Button>
      </div>
    </div>
  );
};

export default LastFiveDaysOrderChart;