import { Fragment } from "react";
import Button from "../ui/button/Button";
import classes from "./OrderHistory.module.css";
import { Link } from "react-router-dom";

const OrderHistory = (props) => {

    var nairaSymbol = "\u20A6";

  return (
    <div className={classes.table}>
      <Link to={"/"}>
        <Button className={classes.btn}> &larr; Back home</Button>
      </Link>
      <h2>Your Order History</h2>
      {props.isLoading ? (
        <p style={{ marginLeft: "6rem" }}>Fetching Orders...</p>
      ) : (
        <>
          {props.orders?.length === 0 ? (
            //   {filteredOrders.length === 0 ? (
            <p style={{ marginLeft: "6rem" }}>You have no Orders</p>
          ) : (
            <Fragment>
              <div className={classes.lead}>
                <p>
                  {" "}
                  <b> {props.orders.length}</b> orders found{" "}
                  {/* <b> {filteredOrders.length}</b> orders found{" "} */}
                </p>
                <p>Click on an order to see the order in Detail</p>
                <p>
                  <b>
                    Also, don't forget to leave a Review by hitting the{" "}
                    <span>Review Button</span>
                  </b>
                </p>
              </div>

              <br />
              <table id="table">
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Order Date</th>
                    <th>Order Time</th>
                    <th>orderId</th>
                    <th>name</th>
                    {/* <th>Reference</th> */}
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {props.orders.map((order, index) => {
                    {
                      /* {filteredOrders.map((order, index) => { */
                    }
                    // const {date,orderid,orderAmount,orderStatus} =order;
                    return (
                      <tr
                        key={order._id}
                        onClick={() => props.orderDetailsHandler(order._id)}>
                        <td>{index + 1}</td>
                        <td>{new Date(order.orderDate).toDateString()}</td>
                        <td>{`${new Date(order.orderTime).toLocaleTimeString()}`}</td>
                        <td>{order._id}</td>
                        <td>{order.firstName}</td>
                        {/* <td>{order.transactionRef}</td> */}
                        <td>
                          {nairaSymbol}
                          {order.orderAmount}
                        </td>
                        <td>{order.orderStatus}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Fragment>
          )}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
