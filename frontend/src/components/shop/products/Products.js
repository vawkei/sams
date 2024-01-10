import ProductsFilter from "../product-filter/ProductsFilter";
import classes from "./Products.module.css";
import ProductsList from "../product-list/ProductsList";
import { useEffect, useState } from "react";
import { getProducts } from "../../../store/product/productIndex";
import { useDispatch, useSelector } from "react-redux";
//import Loader from "../../ui/loader/Loader";
import Spinner from "../../ui/spinner/Spinner";

const Products = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const dispatch = useDispatch();

  const {isLoading} = useSelector((state)=>state.product)

  useEffect(() => {
    dispatch(getProducts());
    //get the products from our db.
  }, []);

  return (
    <>
    {isLoading && <Spinner />}
    {!isLoading ?(
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
    ):(
      null
    ) }
    
    </>
  );
};

export default Products;
