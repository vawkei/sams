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
import Pagination from "../../ui/pagination/Pagination";
import Search from "../../ui/search/Search";
import { filterSliceAction } from "../../../store/product/FilterProduct";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);

  const showDeleteNotifierTrue = (id) => {
    setShowDeleteNotifier(id);
  };
  const showDeleteNotifierFalse = () => {
    setShowDeleteNotifier(null);
  };

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
    setShowDeleteNotifier(false);
    await dispatch(getProducts());
  };

  const { products, isLoading } = useSelector((state) => state.product);
  //console.log(products);

  const {filteredProducts} = useSelector((state)=>state.filter)
  //console.log(filteredProducts)

  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateEditHandler = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  var nairaSymbol = "\u20A6";

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(filterSliceAction.FILTER_BY_SEARCH({products,search}))
  },[products,search])

  const shortenText = (text, n) => {
    if (text.length > 15) {
      const shortenedText = text.substring(0, 15).concat("...");
      return shortenedText;
    }
    return text;
  };

  //Pagination stuff:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexLastItem = currentPage * itemsPerPage; //=6
  const indexFirstItem = indexLastItem - itemsPerPage; //=0

  //const currentItems = products.slice(indexFirstItem, indexLastItem);
  const currentItems = filteredProducts.slice(indexFirstItem, indexLastItem);
  //console.log(currentItems);

  return (
    <div className={classes["allProduct-container"]}>
      <h2>All Products</h2>
      {isLoading && <Loader />}
      <div className={classes.intro}>
        <p>{products.length} products found</p>
        <div className={classes.search}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
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
                {/* {products.map((product, index) => { */}
                {currentItems.map((product,index) => {
                  return (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(product.name,15)}</td>
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
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              products={products}
              filteredProducts={filteredProducts}
            />
          </div>
        ) : (
          <p>No Product found</p>
        )}
      </>
    </div>
  );
};

export default AllProducts;
