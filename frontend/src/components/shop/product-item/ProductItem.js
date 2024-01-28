import classes from "./ProductItem.module.css";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const shortenText = (text, n) => {
    if (text.length > 15) {
      const shortenedText = text.substring(0, 15).concat("...");
      return shortenedText;
    }
    return text;
  };

  var nairaSymbol = "\u20A6";

  return (
    <div className={classes.items}>
      {/* {filteredProducts.length === 0 ?( */}
      {props.currentItems.length === 0 ? (
        <p>No product found</p>
      ) : (
        <>
          {/* {filteredProducts.map((item) => { */}
          {props.currentItems.map((item) => {
            return (
              <Card key={item._id} className={classes.item}>
                <Link to={`/product-detail/${item._id}`}>
                  <div className={classes["main-image"]}>
                    <img src={item.image} alt="meals" />
                  </div>
                </Link>
                <div className={classes.content}>
                  <p>
                    {nairaSymbol} {item.price}
                  </p>
                  <h4>{shortenText(item.name, 15)}</h4>
                  <div className={classes.action}>
                    {item.quantity < 1 ? (
                      <Button className={`${classes.btnRed} ${classes.btn}`} disable>
                        Out of Stock
                      </Button>
                    ) : (
                      <Button className={classes.btn}>Add To Cart</Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProductItem;
