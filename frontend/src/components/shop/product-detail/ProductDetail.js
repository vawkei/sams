import classes from "./ProductDetail.module.css";
import { useParams,useNavigate } from "react-router-dom";
import { DUMMY_ITEMS } from "../products/DummyItems";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const backToProducts = ()=>{
    navigate("/shop")
  };

  const item = DUMMY_ITEMS.find((item) => item.id === id);
  //console.log(DUMMY_ITEMS)
  console.log(item);

  return (
    <div className={classes["product-detail-container"]}>
      <h2>Product Detail</h2>
    
    <p style={{margin:"3rem 0",cursor:"pointer"}} onClick={backToProducts}>&larr; Back to Products</p>
      <div className={classes["content"]}>
        <div className={classes["main-image"]}>
          <img src={item.image} alt="meal" />
        </div>
        <Card className={classes.details}>
          <h2>{item.name}</h2>
          <ul className={classes.ul}>
            <li>
              <b>Price:</b> {item.price}
            </li>
            <li>
              <b>Category:</b> {item.category}
            </li>
            <li>
              <b>Quantity in Stock:</b> {item.quantityInStock}
            </li>
            <li>
              <b>Sold:</b> {item.sold}
            </li>
          </ul>
          <div className={classes.action}>
            <Button className={classes.btn}>Add to Cart</Button>
          </div>
          <Card>
            <h3>Description</h3>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
