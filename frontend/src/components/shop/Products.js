import ProductsFilter from "./ProductsFilter";
import classes from "./Products.module.css";
import ProductsList from "./ProductsList";
import { useState } from "react";

const Products = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <div className={classes["product-container"]}>
      <aside
        className={
          showMobileFilter
            ? `${classes.filter} ${classes.show}`
            : classes.filter
        }>
        <ProductsFilter />
      </aside>

      <div className={classes.productsList}>
        <ProductsList />
      </div>
    </div>
  );
};

export default Products;
