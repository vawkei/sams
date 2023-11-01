const express = require("express");
const router = express.Router();

const {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    review,
    deleteProductReview
  } = require("../controllers/productController");
const { authenticateUser, adminOnly } = require("../middlewares/authenticate-user");

router.get("/",getProducts);

router.get("/:id",getSingleProduct);

router.post("/",authenticateUser,adminOnly, createProduct);

router.patch("/:id",updateProduct);

router.delete("/:id",deleteProduct);

router.patch("/review/:id",authenticateUser,review);

router.patch("/deleteReview/:id",authenticateUser,deleteProductReview);

module.exports = router


// {
//     "name":"Fried chicken",
//     "category":"Meals",
//     "quantity":"100",
//     "price":"1500"
// }

// const date = new Date().getDate()
// const month = new Date().getMonth();
// const year = new Date().getFullYear()
// console.log( `${date}-${month}-${year}`)


