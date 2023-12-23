import ProductsFilter from "../product-filter/ProductsFilter";
import classes from "./Products.module.css";
import ProductsList from "../product-list/ProductsList";
import { useEffect, useState } from "react";
import { getProducts } from "../../../store/product/productIndex";
import { useDispatch } from "react-redux";

const Products = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    //get the products from our db.
  }, []);

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
