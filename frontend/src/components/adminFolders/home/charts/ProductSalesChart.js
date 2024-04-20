import classes from "./ProductSalesChart.module.css";
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


  const ProductSalesChart = (props)=>{
    const productNames = props.productNames;
    const productSales = props.productSales;
    const totalAmountMadePerProduct = props.totalAmountMadePerProduct


    const labelForProductNames = productNames.map((name)=>{
        return name.slice(0,8)
    });
    const labelForProductSales = productSales.map((sold)=>{
        return sold
    });
    const productPriceTimesProductSold = totalAmountMadePerProduct.map((sold)=>{
        return sold
    });

    const data = {
        labels:labelForProductNames ,
        datasets: [
          {
            label: "Product Sold Chart",
            data: labelForProductSales,
            borderColor: "rgba(53,162,235)",
            backgroundColor: "red",
          },
        //   {
        //     label:"Amount Realized from Product",
        //     data:productPriceTimesProductSold
        //   }
          
        ],
      };

      return (
        <Card className={classes.cardClass1}>
          <Bar data={data} options={options} />
        </Card>
      );

  };

  export default ProductSalesChart;