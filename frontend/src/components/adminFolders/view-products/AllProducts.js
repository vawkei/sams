import classes from "./AllProducts.module.css";
import { getProducts } from "../../../store/product/productIndex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader/Loader";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";
import { deleteProduct } from "../../../store/product/productIndex";

const AllProducts = () => {
  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);

  const showDeleteNotifierTrue = (id) => {
    setShowDeleteNotifier(id);
  };
  const showDeleteNotifierFalse = () => {
    setShowDeleteNotifier(null);
    
  };

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
    setShowDeleteNotifier(false)
    await dispatch(getProducts());
  };

  const { products, isLoading } = useSelector((state) => state.product);
  console.log(products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateEditHandler = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  var nairaSymbol = "\u20A6";

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={classes["allProduct-container"]}>
      <h2>All Products</h2>
      {isLoading && <Loader />}
      <div className={classes.intro}>
        <p>{products.length} products found</p>
        {/* <p>Search bar here</p> */}
      </div>
      <>
        {products && products.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.name.slice(0,8)}...</td>
                      <td>{product.category}</td>
                      <td>
                        {nairaSymbol} {product.price.toFixed(2)}
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        {nairaSymbol}{" "}
                        {(product.price * product.quantity).toFixed(2)}
                      </td>
                      <td className={classes.icons}>
                        <div>
                          <AiFillEdit
                            onClick={() => navigateEditHandler(product._id)}
                          />
                        </div>
                        &nbsp;
                        <div>
                          <RiDeleteBin2Line
                            color="red"
                            onClick={showDeleteNotifierTrue}
                          />
                        </div>
                      </td>
                      {showDeleteNotifier && (
                        <DeleteNotifier
                          heading={"Delete Product"}
                          body={`You are about to DELETE ${product.name}`}
                          onConfirm={() => deleteProductHandler(product._id)}
                          cancel={showDeleteNotifierFalse}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Product found</p>
        )}
      </>
    </div>
  );
};

export default AllProducts;
