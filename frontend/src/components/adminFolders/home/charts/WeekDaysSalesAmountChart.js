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
    text: "Order Status Chart",
  },
};

const WeekDaysSalesAmountChart = (props) => {
  const weekdaysOrders = props.weekdaysOrders;
  console.log(weekdaysOrders);

  const mon = props.mon;
  const tue = props.tue;
  const wed = props.wed;
  const thu = props.thu;
  const fri = props.fri;
  const sat = props.sat;
  const sun = props.sun
  // console.log(mon,tue,wed,thu,fri,sat)
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Orders Amount Chart",
        data: [
          weekdaysOrders.Mon,
          weekdaysOrders.Tue,
          weekdaysOrders.Wed,
          weekdaysOrders.Thu,
          weekdaysOrders.Fri,
          weekdaysOrders.Sat,
          weekdaysOrders.Sun,
        ],
        borderColor: "rgba(53,162,235)",
        backgroundColor: "rgba(53,162,235,0.4)",
        pointBorderColor: "red",
        pointBorderWidth: 4,
        tension: 0.5,
      },
      {
        label: "Daily Total Orders Chart",
        data: [
          mon,
          tue,
          wed,
          thu,
          fri,
          sat,
          sun,
        ],
        borderColor: "rgba(53,162,235)",
        backgroundColor: "rgba(53,162,235,0.4)",
        pointBorderColor: "red",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };

  return (
    <div className={classes["week-days-chart"]}>
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

export default WeekDaysSalesAmountChart;
