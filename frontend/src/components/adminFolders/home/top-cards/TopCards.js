import classes from "./TopCards.module.css";
import Card from "../../../ui/card/Card";


const TopCards = (props) => {

    var nairaSymbol = "\u20A6"; 

    return ( 
        <div className={classes["topCards-container"]}>
            <Card>
                <h2>Total Amount</h2>
                <p>{nairaSymbol}{props.totalAmount} </p>
            </Card>
            <Card>
                <h2>Total Products</h2>
                <p>{props.totalProducts}</p>
            </Card>
            <Card>
                <h2>Total Daily Order</h2>
                <p style={{color:"red"}}>{props.totalDailyOrder}</p>
            </Card>
            <Card>
                <h2>Total Daily Amount</h2>
                <p style={{color:"red"}}>{nairaSymbol}{props.totalDailyAmount}</p>
            </Card>
            <Card>
                <h2>Total Orders</h2>
                <p>{props.totalOrders}</p>
            </Card>
        </div>
     );
}
 
export default TopCards;