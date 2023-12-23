import classes from "./ProductsList.module.css";
import Search from "../../ui/search/Search";
import { getProducts } from "../../../store/product/productIndex";
import { useDispatch, useSelector } from "react-redux";
import { DUMMY_ITEMS } from "../products/DummyItems";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
  
  
  const { filteredProducts } = useSelector((state) => state.filter);
  
  //console.log(filteredProducts);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  return (
    <div className={classes["productsList-container"]}>
      <h2>ProductsList</h2>
      <p>{filteredProducts.length} products found </p>
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
      {/* <div className={classes.items}>{items}</div> */}
      <div className={classes.items}>
        {filteredProducts.length === 0 ?(
          <p>No product found</p>
        ):(
          <>
          {filteredProducts.map((item) => {
            return (
              <Card key={item._id} className={classes.item}>
                <Link to={`/product-detail/${item.id}`}>
                  <div className={classes["main-image"]}>
                    <img src={item.image} alt="meals" />
                  </div>
                </Link>
                <div>
                  <p>$ {item.price}</p>
                  <h4>{item.name}</h4>
                  <div className={classes.action}>
                    <Button className={classes.btn}>Add To Cart</Button>
                  </div>
                </div>
              </Card>
            );
          })}
          </>
        )}
        
      </div>
    </div>
  );
};

export default ProductsList;
