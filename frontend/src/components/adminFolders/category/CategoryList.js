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

  const showDeleteNotifierHandlerTrue = (slug) => {
    setShowDeleteNotifier(slug);
  };
  const showDeleteNotifierHandlerFalse = () => {
    setShowDeleteNotifier(null);
  };

  const deleteCategoryHandler = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
    setShowDeleteNotifier(null)
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
                    <tr>
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
                          body={`You are about to DELETE ${cat.name} category`}
                          onConfirm={()=>deleteCategoryHandler(cat.slug)}
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
