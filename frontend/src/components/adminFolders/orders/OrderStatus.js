import "./OrderStatus.css";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import {useEffect, useState} from "react";
import { orderSliceActions, updateOrderStatus } from "../../../store/order/orderIndex";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const OrderStatus = (props) => {
  const status = [
    { id: "1", stat: "Processing" },
    { id: "2", stat: "Delivered" },
  ];

  const [orderStatus, setOrderStatus] = useState("");
  
  const id = props.id;

  const statusUpdateHandler = (e)=>{
    setOrderStatus(e.target.value)
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {message} = useSelector((state)=>state.order)

  const submitHandler =async (e)=>{
    e.preventDefault();

    if(!orderStatus || orderStatus===""){
        console.log("Please select a status")
        return
    };

    console.log({id,orderStatus});
    const formData = {orderStatus}
    await dispatch(updateOrderStatus({id,formData}))

    
  };

  useEffect(()=>{
    if(message === "Status updated"){
      navigate("/admin/orders")
    };
    dispatch(orderSliceActions.RESET_ORDER_STATE())
  },[message,navigate]);

  return (
    <div className={"status-container"}>
      <Card>
        <h3>Update Status</h3>
        <form onSubmit={submitHandler}>
          <select name="" id="" value={orderStatus} onChange={statusUpdateHandler}>
            <option disabled value={""}>
              ---Select a status---
            </option>
            {status.map((stats) => {
              return <option key={stats.id}>{stats.stat}</option>;
            })}
          </select>
          <div className="action">
            <Button className="btn">Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OrderStatus;
