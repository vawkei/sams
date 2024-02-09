import "./OrderDetails.css";
import { useParams,useNavigate } from "react-router-dom";
import { getSingleOrder } from "../../../store/order/orderIndex";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "../../ui/button/Button";
import Loader from "../../ui/loader/Loader";
import OrderStatus from "./OrderStatus";

const OrderDetails = () => {

    const {id} = useParams();
    console.log(id);

    var nairaSymbol = "\u20A6"; 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {order,isLoading} = useSelector((state)=>state.order);
    console.log(order);

    const backToOrdersHandler = () => {
        navigate("/admin/orders");
      };
    
    useEffect(()=>{
        dispatch(getSingleOrder(id))
    },[dispatch]);

    return ( 
        <div className="container">
            {isLoading && <Loader />}
            <h2>Admin Order Details</h2>
            <Button onClick={backToOrdersHandler}>&larr; Back to orders</Button>
            <div className="intro">
                <h2>To: {order?.firstName} {order?.surname}</h2>
                <p><b>orderID: {order?._id}</b></p>
                <p><b>order Amount: {nairaSymbol} {order?.orderAmount}</b></p>
                <p><b>coupon:{order?.coupon}</b></p>
                <p><b>order status: {order?.orderStatus}</b></p>
                <p><b>address: {order?.residentialAddress}</b></p>
                <p><b>town: {order?.town}</b></p>
                <p><b>state: {order?.state}</b></p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.cartItems.map((item,index)=>{
                        const {name,price,productCartQty,image} = item;
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <div>
                                        {name}
                                        <div className="main-image">
                                            <img src={image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{nairaSymbol} {price}</td>
                                <td>{productCartQty}</td>
                                <td>{nairaSymbol} {price * productCartQty}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <OrderStatus id={id} />
        </div>
     );
}
 
export default OrderDetails;