import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import classes from "./AddProduct.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../../store/product/productIndex";
import { getCategories } from "../../../store/category/categoryIndex";
import productSlice, {
  getSingleProduct,
} from "../../../store/product/productIndex";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../ui/loader/Loader";

const EditProduct = () => {
  const { id } = useParams();

  //console.log(id);

  const productEdit = useSelector((state) => state.product.product);
  console.log(productEdit);

  const { isLoading, message } = useSelector((state) => state.product);

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [cloudinaryLoading,setCloudinaryLoading] = useState(false);

  const [product, setProduct] = useState({ ...productEdit });
  console.log(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  //uploadPhotoToCloudinary:

  //let imageUrl = "";
  const saveToCloudinary = async (e) => {
    e.preventDefault();

    setCloudinaryLoading(true);

    try {
      if (
        productImage !== null &&
        (productImage.type === "image/jpeg" ||
          productImage.type === "image/jpg" ||
          productImage.type === "image/png")
      ) {
        let image = new FormData();
        image.append("image", productImage);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/upLoadProductImage`,
          {
            method: "POST",
            body: image,
            headers: { "X-Request-With": "XMLHttpRequest" },
          }
        );

        if (response.ok) {
          const clone = response.clone();
          const contentLength = +response.headers.get("Content-Length");
          let receivedLength = 0;

          const reader = clone.body.getReader();

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            receivedLength += value.length;
            const progress = (receivedLength / contentLength) * 100;
            setUploadProgress(progress);

            const imageData = await response.json();
            console.log(imageData);
            
            //setImageURL(imageData.msg.src);
            setProduct({...product,image:imageData.msg.src})
            

            console.log("Upload to cloudinary completed", imageURL);
            setImagePreview(null);
            setCloudinaryLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getCategories());
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
  }, [productEdit]);

  const editProductToMongo = async (e) => {
    e.preventDefault();

    // if(imageURL===""){
    //   console.log("Please upload an image")
    //   return
    // }

    const formData = {
      name: product.name,
      category: product.category,
      quantity: Number(product.quantity),
      price: Number(product.price),
      // image: imageURL,
      image: product.image,
      description: product.description,
      regularPrice: product.regularPrice,
      //sku: skuHandler(product.category),
    };
    await dispatch(updateProduct({ id, formData }));
    setImagePreview(null)
  };

  useEffect(() => {
    if (message === "Product updated") {
      navigate("/admin/view-products");
      dispatch(productSlice.actions.RESET_PRODUCT_STATE());
    }
  }, [dispatch, message]);

  return (
    <div className={classes["add-productContainer"]}>
      {isLoading && <Loader />}
      <h2>Update Product</h2>
      <Card>
        <form onSubmit={editProductToMongo}>
          <div className={classes.control}>
            <label htmlFor="">Product name</label>
            <input
              type="text"
              required
              value={product?.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <Card>
            <form action="">
              <div className={classes.control}>
                <label htmlFor="">Product image</label>

                {imagePreview === null ? (
                  <>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="productImage"
                    name="image"
                    onChange={handleImageChange}
                  />
                  <img src={product?.image} width={100}/>
                  </>
                ) : (
                  <>
                    <img src={imagePreview} alt="Product photo" width={100} />
                    <Button className={classes.btn} onClick={saveToCloudinary}>
                      saveToCloudinary
                    </Button>
                    {cloudinaryLoading && <p>Sending to cloudinary...</p>}
                  </>
                )}

                {uploadProgress === 0 ? null : (
                  <div className={classes.progress}>
                    <div
                      className={classes["progress-bar"]}
                      style={{ width: `${uploadProgress}%` }}>
                      {uploadProgress < 100
                        ? `uploading ${uploadProgress}%`
                        : `Lisa Lipps ${uploadProgress}%`}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </Card>
          <div className={`${classes.control} ${classes.cat}`}>
            <label htmlFor="">Product category</label>
            <select
              name="category"
              value={product?.category}
              onChange={handleInputChange}
              required>
              <option disabled value={""}>
                Select a Category
              </option>
              {categories.length > 0 &&
                categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat.name}>
                      {cat?.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product quantity</label>
            <input
              type="number"
              required
              name="quantity"
              value={product?.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product price</label>
            <input
              type="number"
              name="price"
              required
              value={product?.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product regularPrice</label>
            <input
              type="number"
              name="regularPrice"
              required
              value={product?.regularPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product description</label>
            <textarea
              name="description"
              value={product?.description}
              onChange={handleInputChange}
              id=""
              cols="10"
              rows="7"
              required></textarea>
          </div>
          <div className={classes.action}>
            <Button>Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProduct;
