import classes from "./ProductsList.module.css";
import Search from "../../ui/search/Search";
//import { getProducts } from "../../../store/product/productIndex";
import { useDispatch, useSelector } from "react-redux";
//import { DUMMY_ITEMS } from "../products/DummyItems";
// import Button from "../../ui/button/Button";
// import Card from "../../ui/card/Card";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { filterSliceAction } from "../../../store/product/FilterProduct";
import Pagination from "../../ui/pagination/Pagination";
import ProductItem from "../product-item/ProductItem";
import { getCartDb } from "../../../store/cart/cartIndex";

// const items = DUMMY_ITEMS.map((item) => {
//   return (
//     <Card key={item.id} className={classes.item}>
//       <Link to={`/product-detail/${item.id}`}>
//       <div className={classes["main-image"]}>
//         <img src={item.image} alt="meals" />
//       </div>
//       </Link>
//       <div>
//         <p>$ {item.price}</p>
//         <h4>{item.name}</h4>
//         <div className={classes.action}>
//           <Button className={classes.btn}>Add To Cart</Button>
//         </div>
//       </div>
//     </Card>
//   );
// });

const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");

  const { filteredProducts } = useSelector((state) => state.filter);
  //console.log(filteredProducts);
  const { products } = useSelector((state) => state.product);
  //console.log(products);

  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(filterSliceAction.FILTER_BY_SEARCH({ products, search }));
    //we get the products from the Products.js file, which gets the product from db, then we send it to redux with search.
  }, [products, search]);

  useEffect(() => {
    dispatch(filterSliceAction.FILTER_BY_SORT({ products, sort }));
  }, [products, sort]);
  
  //Pagination stuff:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexLastItem = currentPage * itemsPerPage; //=6
  const indexFirstItem = indexLastItem - itemsPerPage; //=0

  const currentItems = filteredProducts.slice(indexFirstItem, indexLastItem);
  console.log(currentItems);

  return (
    <div className={classes["productsList-container"]}>
      <h2>ProductsList</h2>
      <p>{filteredProducts.length} products found </p>
      <div className={classes.heading}>
        <div className={classes.search}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={classes.sort}>
          <label htmlFor="">Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="Latest">Latest</option>
            <option value="Lowest-price">Lowest-price</option>
            <option value="Highest-price">Highest-price</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <button className={classes.toggleButton}>&#9776;</button>
        </div>
      </div>
      {/* LIST OF ITEMS */}
      {/* <div className={classes.items}>{items}</div> */}
      <ProductItem
        filteredProducts={filteredProducts}
        currentItems={currentItems}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        products={products}
        filteredProducts={filteredProducts}
      />
    </div>
  );
};

export default ProductsList;
