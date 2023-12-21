import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import classes from "./AddProduct.module.css";
import { useSelector, useDispatch } from "react-redux";
import productSlice, { createProduct } from "../../../store/product/productIndex";
import { getCategories } from "../../../store/category/categoryIndex";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Loader from "../../ui/loader/Loader";

const initialState = {
  name: "",
  category: "",
  quantity: 0,
  price: 0,
  image: "",
  description: "",
  regularPrice: "",
  sku: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageURL,setImageURL] = useState("");

  const {categories} = useSelector((state) => state.category);
  const {message,isLoading} = useSelector((state) => state.product);
  //console.log(categories);

  const [cloudinaryLoading,setCloudinaryLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
            //imageUrl = imageData.msg.src;
            setImageURL(imageData.msg.src)
            console.log("Upload to cloudinary completed", imageURL);
            setImagePreview(null);
            setCloudinaryLoading(false)
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

//console.log(imageURL)
  const timeNow = Date.now();

  // const skuHandler = (category)=>{
  //   const name = product.category.slice(0,3)
  //   const sku =  `${name}-${timeNow}`
  //   return 
  // };

  //console.log(skuHandler())

  const saveProductToMongo = async (e) => {

    e.preventDefault()

    
    if(imageURL===""){
      console.log("Please upload an image")
      return
    }

    const formData = {
      name: product.name,
      category: product.category,
      quantity: Number(product.quantity),
      price: Number(product.price),
      image: imageURL,
      description: product.description,
      regularPrice: product.regularPrice,
      //sku: skuHandler(product.category),
    };
    //console.log(formData)
     dispatch(createProduct(formData))
  
    // setProduct({
    //   name:"",
    //   category:"",
    //   quantity:"",
    //   price:"",
    //   regularPrice:"",
    //   image:"",
    //   description:"",
    //   sku:""
    // })

  };

  useEffect(()=>{
    if(message === "Product created"){
      navigate("/admin/view-products")
      dispatch(productSlice.actions.RESET_PRODUCT_STATE())
    }
  },[message])

  return (
    <div className={classes["add-productContainer"]}>
      {isLoading && <Loader />}
      <h2>Add Product</h2>
      <Card>
        <form onSubmit={saveProductToMongo}>
          <div className={classes.control}>
            <label htmlFor="">Product name</label>
            <input
              type="text"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <Card>
            <form action="">
              <div className={classes.control}>
                {/* {cloudinaryLoading && <p>Sending to cloudinary...</p>} */}
                <label htmlFor="">Product image</label>

                {imagePreview === null ? (
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="productImage"
                    name="image"
                    onChange={handleImageChange}
                  />
                ) : (
                  <>
                    <img src={imagePreview} alt="Product photo" width={100} />
                    <Button onClick={saveToCloudinary} className={classes.btn}>
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

                {product.image === "" ? null : (
                  <input
                    type="text"
                    placeholder="imageURL"
                    disabled
                    name=""
                    value={product.image}
                    
                  />
                )}
              </div>
            </form>
          </Card>
          <div className={`${classes.control} ${classes.cat}`}>
            <label htmlFor="">Product category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required>

              <option disabled value={""}>Select a Category</option>
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
              value={product.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product price</label>
            <input
              type="number"
              name="price"
              required
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product regularPrice</label>
            <input
              type="number"
              name="regularPrice"
              required
              value={product.regularPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product description</label>
            <textarea
              name="description"
              value={product.description}
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

export default AddProduct;
