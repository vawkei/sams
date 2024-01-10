import classes from "./CategoryList.module.css";
import Card from "../../ui/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories } from "../../../store/category/categoryIndex";
import Loader from "../../ui/loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";
import { deleteCategory } from "../../../store/category/categoryIndex";

const CategoryList = () => {
  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);


  const showDeleteNotifierHandlerTrue = (slug) => {
    setCategoryToDelete(slug);//stores the slug we want to delete in this state
    setShowDeleteNotifier(true);
  };

  const showDeleteNotifierHandlerFalse = () => {
    setShowDeleteNotifier(false);
    setCategoryToDelete(null);

  };

  const deleteCategoryHandler = async () => {
    await dispatch(deleteCategory(categoryToDelete))//slug has been stored in the categoryToDelete curtesy of showDeleteNotifierHandlerFalse()
    await dispatch(getCategories());
    setShowDeleteNotifier(false)
  };

  const { categories, isLoading } = useSelector((state) => state.category);
  //console.log(categories.categories)

  // const categoriesRedux = categories.categories;
  // console.log(categoriesRedux);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={classes["category-list"]}>
      <h2>
        {" "}
        <b>All Categories</b>{" "}
      </h2>
      <Card>
        {isLoading && <Loader />}
        {/* {isLoading && categories.length ===0 ? <Loader /> : null} */}
        {isLoading && categories.length === 0 ? <Loader /> :null}
        {categories.length === 0 ? (
          <p>No Categories Found</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => {
                  return (
                    <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td>{cat.name}</td>
                      <td>{cat.slug}</td>
                      <td>
                        <FaTrashAlt
                          size={16}
                          color="red"
                          onClick={() =>
                            showDeleteNotifierHandlerTrue(cat.slug)
                          }
                        />
                      </td>
                      {showDeleteNotifier && (
                        <DeleteNotifier
                          heading={"Delete Category"}
                          body={`You are about to DELETE ${categoryToDelete} category`}
                          onConfirm={deleteCategoryHandler}
                          cancel={showDeleteNotifierHandlerFalse}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </Card>
    </div>
  );
};

export default CategoryList;










