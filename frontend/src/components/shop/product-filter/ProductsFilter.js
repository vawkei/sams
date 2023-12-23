import classes from "./ProductFilter.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  //getProducts,
  productActions,
} from "../../../store/product/productIndex";
import { Fragment, useEffect, useState } from "react";
import { filterSliceAction } from "../../../store/product/FilterProduct";

const ProductsFilter = () => {
  const [category, setCategory] = useState("ALL");
  const [price, setPrice] = useState(1000);

  const dispatch = useDispatch();
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const allCategories = [
    "ALL",
    ...new Set(
      products.map((product) => {
        return product.category;
      })
    ),
  ];

  //console.log(allCategories);

  const categoryHandler = (cat) => {
    setCategory(cat);
    dispatch(filterSliceAction.FILTER_BY_CATEGORY({ products, category:cat }));
    console.log("button is working");
    //this does two functions, it it updates our category state with whatever we click on.if we click on Meals, it updates category to Meal. Then it sends products and our cat to filterproducts redux, for filtering
  };

  useEffect(() => {
    dispatch(productActions.GET_PRICE_RANGE(products));
    //first we send the products to redux productIndex, so we can get the min and maxPrice from our product list.
  },[dispatch,products]);



  useEffect(() => {
    dispatch(filterSliceAction.FILTER_BY_PRICE({ products, price }));
    //then we send the products and price to the filterproduct redux, we filter the products that are < the price. initially is 1000, but when we adjust the slide the price changes too.
  },[dispatch,products,price]);

  const clearFilter = () => {
    setCategory("ALL");
    setPrice(maxPrice);
    // Dispatch actions to clear filters in the Redux store
    dispatch(filterSliceAction.FILTER_BY_CATEGORY({ products, category: "ALL" }));
  };

  return (
    <Fragment>
      <div className={classes.filterComp}>
        <div className={classes.category}>
          <h4>Categories</h4>
          {allCategories.map((cat, index) => {
            return (
              <p
                key={index}
                onClick={() => categoryHandler(cat)}
                className={`${category}` === cat ? ` ${classes.active}` : ""}>
               &#8250;  {cat}
              </p>
            );
          })}
        </div>
        <div className={classes["price-slider"]}>
          <input
            type="range"
            value={price}
            min={minPrice}
            max={maxPrice}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={classes.btn}>
          <button onClick={clearFilter}>Clear filter</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsFilter;
