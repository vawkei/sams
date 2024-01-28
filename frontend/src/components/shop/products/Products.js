import ProductsFilter from "../product-filter/ProductsFilter";
import classes from "./Products.module.css";
import ProductsList from "../product-list/ProductsList";
import { useEffect, useState } from "react";
import { getProducts } from "../../../store/product/productIndex";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/spinner/Spinner";

const Products = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.product);

  const showMobileFilterHandler = () => {
    setShowMobileFilter((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(getProducts());
    //get the products from our db.
  }, []);

  return (
    <div>
      {isLoading ? (
      <Spinner />
      ) : (
        <div className={classes["product-container"]}>
          <div
            className={showMobileFilter ? classes.backdrop : ""}
            onClick={showMobileFilterHandler}></div>

          <aside
            className={
              showMobileFilter
                ? `${classes.filter} ${classes.showFilter}`
                : `${classes.filter}`
            }>
        
            <ProductsFilter showMobileFilterHandler={showMobileFilterHandler} />
          </aside>
          
          <div className={classes.productsList}>
            <ProductsList showMobileFilterHandler={showMobileFilterHandler} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
