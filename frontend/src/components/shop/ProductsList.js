import classes from "./ProductsList.module.css";
import Search from "../ui/search/Search";

import { DUMMY_ITEMS } from "./DummyItems";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";

const items = DUMMY_ITEMS.map((item) => {
  return (
    <Card key={item.id} className={classes.item}>
      <div className={classes["main-image"]}>
        <img src={item.image} alt="meals" />
      </div>
      <div>
        <p>$ {item.price}</p>
        <h4>{item.name}</h4>
        <Button>Add To Cart</Button>
      </div>
    </Card>
  );
});

const ProductsList = () => {
  return (
    <div className={classes["productsList-container"]}>
      <h2>ProductsList</h2>
      <div className={classes.heading}>
        <div className={classes.search}>
          <Search />
        </div>
        <div className={classes.sort}>
          <label htmlFor="">Sort by:</label>
          <select>
            <option value="Latest">Latest</option>
          </select>
          <button className={classes.toggleButton}>&#9776;</button>
        </div>
      </div>
      {/* LIST OF ITEMS */}
      <div className={classes.items}>{items}</div>
    </div>
  );
};

export default ProductsList;
