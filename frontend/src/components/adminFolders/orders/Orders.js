import "./Orders.css";
import { getAdminOrders, orderSliceActions } from "../../../store/order/orderIndex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../ui/pagination/Pagination";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.adminOrders);
  //console.log(orders);
  const filteredProducts = orders;

  const isLoading = useSelector((state) => state.order.isLoading);

  

  const orderStatusHandler = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  useEffect(() => {
    dispatch(getAdminOrders());
    dispatch(orderSliceActions.REMOVE_NEW_ORDER_COUNT())
  }, [dispatch]);

  //Pagination stuff:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexLastItem = currentPage * itemsPerPage; //=6
  const indexFirstItem = indexLastItem - itemsPerPage; //=0

  const currentItems = filteredProducts.slice(indexFirstItem, indexLastItem);
  console.log(currentItems);
  return (
    <div className="table">
      <h2>Total Orders</h2>
      {isLoading ? (
        <p>Fetching Orders...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p>No Order Found in the Database</p>
          ) : (
            <table className="table-table">
              <thead className="table-thead">
                <tr className="table-tr">
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>UserID</th>
                  <th>Name</th>
                  <th>OrderID</th>
                  {/* <th>Reference</th> */}
                  <th>cartTotalQty</th>
                  <th>Payment Method</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {/* {orders.map((order, index) => { */}
                {currentItems.map((order, index) => {
                  const {
                    orderDate,
                    cartTotalQty,
                    createdBy,
                    updatedAt,
                    firstName,
                    surname,
                    orderStatus,
                    paymentMethod,
                    orderAmount,
                    _id,
                  } = order;
                  return (
                    <tr key={_id} onClick={() => orderStatusHandler(_id)}>
                      <td className="table-td">{index + 1}</td>
                      <td>{new Date(orderDate).toLocaleDateString()}</td>
                      <td className="time-string">
                        {new Date(orderDate).toLocaleTimeString()}
                      </td>
                      <td>{createdBy}</td>
                      <td>
                        {firstName} {surname}
                      </td>
                      <td>{_id}</td>
                      <td>{cartTotalQty}</td>
                      <td>{paymentMethod}</td>
                      <td>{orderAmount}</td>
                      <td className="stats">
                        <p
                          className={
                            orderStatus === "Delivered"
                              ? "delivered"
                              : orderStatus === "Processing"
                              ? "processing"
                              : orderStatus === "Order Placed"
                              ? "pending"
                              : ""
                          }>
                          {orderStatus}
                        </p>
                        <p>{new Date(updatedAt).toLocaleString()}</p>{" "}
                        {/* <p>{new Date(order.updatedAt).toLocaleTimeString()}</p>{" "} */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
       <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        // products={products}
        filteredProducts={filteredProducts}
      />
    </div>
  );
};

export default Orders;
