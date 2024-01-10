import { useEffect } from "react";
import OrderHistory from "../components/order-history/OrderHistory";
import { getOrders } from "../store/order/orderIndex";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {

    const {orders,isLoading} = useSelector((state)=>state.order);
    console.log(orders);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getOrders());
    },[dispatch]);

    const orderDetailsHandler = (id)=>{
        navigate(`/order-history/${id}`) ;
    };

    return ( 
        <OrderHistory orders={orders} orderDetailsHandler={orderDetailsHandler} isLoading={isLoading}/>
     );
}
 
export default OrderHistoryPage;