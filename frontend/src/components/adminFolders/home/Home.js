import classes from "./Home.module.css";
import TopCards from "./top-cards/TopCards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../store/product/productIndex";
import Loader from "../../ui/loader/Loader";
import { getAdminOrders } from "../../../store/order/orderIndex";
import OrderStatusChat from "./charts/OrderStatusChat";
import LastFiveDaysOrderChart from "./charts/LastFiveDaysOrderChart";
import WeekDaysSalesAmountChart from "./charts/WeekDaysSalesAmountChart";
import MonthlySalesAmountChart from "./charts/MonthlySalesAmountChart";
import ProductSalesChart from "./charts/ProductSalesChart";

const Home = () => {
  const dispatch = useDispatch();
  const [showMonthlySalesAmountChart, setShowMonthlySalesAmountChart] =
    useState(true);

  const showMonthlySalesAmountChartHandler = () => {
    setShowMonthlySalesAmountChart((curr) => !curr);
  };

  const [showOrderstatusChart, setShowOrderstatusChart] = useState(true);

  const showOrderstatusChartHandler = () => {
    setShowOrderstatusChart((curr) => !curr);
  };

  //1:orderAmountTotal==============================================================:
  const { adminOrders } = useSelector((state) => state.order);
  console.log(adminOrders);
  const orderAmount = adminOrders.map((allOrders) => allOrders.orderAmount);
  //console.log(orderAmount);
  const totalOrderAmount = orderAmount.reduce((a, b) => {
    return a + b;
  }, 0);
  //answer: console.log(totalOrderAmount)
  const totalAmount = totalOrderAmount;

  //2:totalProducts==================================================================:
  const { products, isLoading } = useSelector((state) => state.product);
  // console.log(products);
  const totalProducts = products?.length;

  //3:totalDailyOrder==============================================================:
  const a = adminOrders.map((allOrders) => allOrders.orderDate);
  //console.log(a);
  const x = a.map((y) => {
    return new Date(y).toLocaleDateString();
  });
  //console.log(x)
  const today = new Date().toLocaleDateString();
  //console.log(today)
  const totalDailyOrders = x.filter(
    (allOrders) => allOrders === today.toString()
  );
  //answer: console.log(totalDailyOrders.length);
  const totalDailyOrder = totalDailyOrders.length;

  //4:totalDailyAmount================================================================:

  const dailyOrder = adminOrders.filter((allOrders) => {
    let x = allOrders.orderDate;
    const y = new Date(x).toLocaleDateString() === today;
    return y;
  });
  //console.log(dailyOrder);
  const totalDailyAmountFigures = dailyOrder.map((x) => x.orderAmount);
  //console.log(totalDailyAmountFigures);
  const totalDailyAmounts = totalDailyAmountFigures.reduce((a, b) => {
    return a + b;
  }, 0);

  //console.log(totalDailyAmounts);
  const totalDailyAmount = totalDailyAmounts;

  //5:TotalOrders=======================================================================
  const allOrders = adminOrders.length;
  const totalOrders = allOrders;

  //6:OrderStatus===================================================================
  const orderStatus = adminOrders.map((allOrders) => {
    return allOrders.orderStatus;
  });
  //console.log(orderStatus)
  //7:OrderStatus length=============================================================
  const Processing = "Processing";
  const OrderPlaced = "Order Placed";
  const Delivered = "Delivered";

  const ordersProcessed = orderStatus.filter((order) => {
    return order === Processing;
  });
  const processedOrders = ordersProcessed.length;
  //console.log(processedOrders)

  const ordersPlaced = orderStatus.filter((order) => {
    return order === OrderPlaced;
  });
  const placedOrders = ordersPlaced.length;
  // console.log(placedOrders)

  const ordersDelivered = orderStatus.filter((order) => {
    return order === Delivered;
  });
  const deliveredOrder = ordersDelivered.length;
  //console.log(deliveredOrder)

  //toDateString()

  //8:salesByMonthLineChart===========================================================
  // step 1: Extract the month from each order
  const getOrderMonth = adminOrders.map((order) => {
    const orderMonth = new Date(order.orderDate).toLocaleString("en-US", {
      month: "short",
    });
    return orderMonth;
  });
  //console.log(getOrderMonth);
  // Step 2: Calculate the total order amount per month using reduce
  const totalOrderByMonth = adminOrders.reduce((acc, order) => {
    // Get the short name of the month from the order date
    const orderMonth = new Date(order.orderDate).toLocaleString("en-US", {
      month: "short",
    });
    // Find out how much money we've spent this month so far
    const currentMonthTotal = acc[orderMonth] || 0;
    // Add the cost of the current order to the total amount for this month
    acc[orderMonth] = currentMonthTotal + order.orderAmount;

    return acc; // Return the updated accumulator
  }, {});
  //console.log(totalOrderByMonth)

  //8:salesByWeekDaysLineChart====================================================

  //step1:
  const day = adminOrders.map((order) => {
    let x = new Date(order.orderDate).toLocaleString("en-US", {
      weekday: "short",
    });
    return x;
  });
  //console.log(day);
  //step2:
  const weekdaysOrders = adminOrders.reduce((acc, order) => {
    const orderDay = new Date(order.orderDate).toLocaleString("en-US", {
      weekday: "short",
    });
    let currentWeekDayTotal = acc[orderDay] || 0;
    acc[orderDay] = currentWeekDayTotal + order.orderAmount;

    return acc; // Return the updated accumulator
  }, {});
  //console.log(weekdaysOrders);

  //9:ordersByWeekDaysLineChart=======================================================

  const weeklyDailyArray = [];

  const getOrderWeek = adminOrders.map((order) => {
    let weeklyOrders = order.orderDate;
    weeklyOrders = new Date(weeklyOrders).toDateString().slice(0, 3);
    weeklyDailyArray.push(weeklyOrders);
    return weeklyOrders;
  });
  console.log(getOrderWeek);
  console.log(weeklyDailyArray);

  const getOrderWeekFunc = (order, value) => {
    return order.filter((n) => n === value).length;
  };

  const mon = getOrderWeekFunc(weeklyDailyArray, "Mon");
  const tue = getOrderWeekFunc(weeklyDailyArray, "Tue");
  const wed = getOrderWeekFunc(weeklyDailyArray, "Wed");
  const thu = getOrderWeekFunc(weeklyDailyArray, "Thu");
  const fri = getOrderWeekFunc(weeklyDailyArray, "Fri");
  const sat = getOrderWeekFunc(weeklyDailyArray, "Sat");
  const sun = getOrderWeekFunc(weeklyDailyArray, "Sun");

  //10:LastFiveDaysSalesLineChartDateExtraction=======================================

  const currentDate = new Date();
  //console.log(currentDate.toDateString());
  //daytwo:
  let day2 = new Date();
  day2.setDate(currentDate.getDate() - 1);
  //console.log(day2.toDateString());
  //daythree:
  let day3 = new Date();
  day3.setDate(currentDate.getDate() - 2);
  //console.log(day3.toDateString());
  //dayfour:
  let day4 = new Date();
  day4.setDate(currentDate.getDate() - 3);
  //console.log(day4.toDateString());
  //dayfive:
  let day5 = new Date();
  day5.setDate(currentDate.getDate() - 4);
  //console.log(day5.toDateString());

  //11:LastFiveDaysTotalOrdersAmountLineChart=========================================
  const orders = adminOrders;
  //todays:
  const oni = orders.filter((order) => {
    let x =
      new Date(order.orderDate).toDateString() === currentDate.toDateString();
    return x;
  });
  //console.log(oni);

  const todaysTotalOrderAmount = oni.reduce((a, b) => {
    return a + b.orderAmount;
  }, 0);
  //console.log(todaysTotalOrderAmount);

  //yesterdays:
  const anor = orders.filter((order) => {
    let x = new Date(order.orderDate).toDateString() === day2.toDateString();
    return x;
  });
  //console.log(anor);

  const day2sTotalOrderAmount = anor.reduce((a, b) => {
    return a + b.orderAmount;
  }, 0);
  //console.log(day2sTotalOrderAmount);

  //day3:
  const ijeta = orders.filter((order) => {
    let x = new Date(order.orderDate).toDateString() === day3.toDateString();
    return x;
  });
  //console.log(ijeta);

  const day3sTotalOrderAmount = ijeta.reduce((a, b) => {
    return a + b.orderAmount;
  }, 0);
  //console.log(day3sTotalOrderAmount);

  //day4:
  const ijerin = orders.filter((order) => {
    let x = new Date(order.orderDate).toDateString() === day4.toDateString();
    return x;
  });
  //console.log(ijerin);

  const day4sTotalOrderAmount = ijerin.reduce((a, b) => {
    return a + b.orderAmount;
  }, 0);
  //console.log(day4sTotalOrderAmount);

  //day5:
  const ijarun = orders.filter((order) => {
    let x = new Date(order.orderDate).toDateString() === day5.toDateString();
    return x;
  });
  //console.log(ijarun);

  const day5sTotalOrderAmount = ijarun.reduce((a, b) => {
    return a + b.orderAmount;
  }, 0);
  //console.log(day5sTotalOrderAmount);

  //12:LastFiveDaysTotalOrdersLineChart=================================================

  let array = [];
  adminOrders.map((orders) => {
    return array.push(new Date(orders.orderDate).toDateString());
  });

  //console.log(array)

  const getSalesOfLast5Days = (array, value) => {
    return array.filter((n) => n === value).length;
  };

  const currentDay = getSalesOfLast5Days(array, currentDate.toDateString());
  const day_2 = getSalesOfLast5Days(array, day2.toDateString());
  const day_3 = getSalesOfLast5Days(array, day3.toDateString());
  const day_4 = getSalesOfLast5Days(array, day4.toDateString());
  const day_5 = getSalesOfLast5Days(array, day5.toDateString());

  //13: product sales===================================================

  const productNames = products.map((product) => {
    return product.name;
  });
  console.log(productNames);

  const productSales = products.map((product) => {
    return product.sold;
  });
  console.log(productSales);

  //14. TotalAmount made per product sold=========================================
  //****commented this one****
  const totalAmountMadePerProduct = products.reduce((acc, product) => {
    //const currentProduct = acc[product.name] || 0 ;
    acc[product.name] = product.price * product.sold;
    return acc;
  }, {});
  console.log(totalAmountMadePerProduct);

  //turning the object into an array:
  const arrTotalAmountMadePerProduct = Object.keys(
    totalAmountMadePerProduct
  ).map((key) => totalAmountMadePerProduct[key]);
  console.log(arrTotalAmountMadePerProduct); 

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAdminOrders());
  }, [dispatch]);

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <h2>Admin Dashboard</h2>
      <>
        <TopCards
          totalAmount={totalAmount}
          totalProducts={totalProducts}
          totalDailyOrder={totalDailyOrder}
          totalDailyAmount={totalDailyAmount}
          totalOrders={totalOrders}
        />
        <div>
          {showMonthlySalesAmountChart && (
            <MonthlySalesAmountChart
              showMonthlySalesAmountChartHandler={
                showMonthlySalesAmountChartHandler
              }
            />
          )}
          {!showMonthlySalesAmountChart && (
            <WeekDaysSalesAmountChart
              weekdaysOrders={weekdaysOrders}
              mon={mon}
              tue={tue}
              wed={wed}
              thu={thu}
              fri={fri}
              sat={sat}
              sun={sun}
              showMonthlySalesAmountChartHandler={
                showMonthlySalesAmountChartHandler
              }
            />
          )}
        </div>
        <div className={classes["home-orderStatusChat"]}>
          {showOrderstatusChart && (
            <OrderStatusChat
              processing={processedOrders}
              placed={placedOrders}
              delivered={deliveredOrder}
              showOrderstatusChartHandler={showOrderstatusChartHandler}
            />
          )}
          {!showOrderstatusChart && (
            <LastFiveDaysOrderChart
              currentDate={currentDate}
              day2={day2}
              day3={day3}
              day4={day4}
              day5={day5}
              currentDay={currentDay}
              day_2={day_2}
              day_3={day_3}
              day_4={day_4}
              day_5={day_5}
              oni={todaysTotalOrderAmount}
              anor={day2sTotalOrderAmount}
              ijeta={day3sTotalOrderAmount}
              ijerin={day4sTotalOrderAmount}
              ijarun={day5sTotalOrderAmount}
              showOrderstatusChartHandler={showOrderstatusChartHandler}
            />
          )}
          <ProductSalesChart
            productNames={productNames}
            productSales={productSales}
            totalAmountMadePerProduct={arrTotalAmountMadePerProduct}
         />
        </div>
      </>
    </div>
  );
};

export default Home;
