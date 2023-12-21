import classes from "./CreateCategory.module.css";
import Card from "../../ui/card/Card";
import { useState } from "react";
import Button from "../../ui/button/Button";
import Loader from "../../ui/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  createCategory,
} from "../../../store/category/categoryIndex";

const CreateCategory = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.category);

  const setNameHandler = (e) => {
    setName(e.target.value);
  };

  const submitCategoryHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      //toast.error("Please enter a name")
      console.log("Please enter a name");
      return;
    }
    if (name.length < 3 || name.length > 10) {
      console.log("Name shouldn't be <3 or >10 characters");
      return;
    }
    //console.log(name)
    const formData = { name };
    await dispatch(createCategory(formData));
    setName("");
    dispatch(getCategories());
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={classes["create-category"]}>
        <h2>
          <b>Create Category</b>
        </h2>

        <Card>
          <form action="" onSubmit={submitCategoryHandler}>
            <div className={classes.control}>
              <label htmlFor="">Category name:</label>
              <input
                type="text"
                value={name}
                onChange={setNameHandler}
                required
              />
            </div>
            <div className={classes.action}>
              <Button className={classes.btn}>Create category</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCategory;
