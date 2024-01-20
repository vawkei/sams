const Products = require("../models/products");
const Users = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//getProducts:
const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    if (!products || products.length === 0) {
      return res.status(200).json({ msg: "No products found" });
    }
    res.status(200).json({ products, nbhits: products.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

//getSingleProducts:
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;

  const users = await Users.find({});

  try {
    const product = await Products.findOne({ _id: productId });
    
    product.productViews.viewCount ++;
    //console.log(productViews) to get it back to 0, go and update it in mongoDb atlas products-productViews-viewCount,clickon the number there.

    await product.save();

    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

//uploadImageToCloudinary:
const upLoadProductImage = async (req, res) => {

  // const userId = req.user.userId;

  try {
    if (!req.files) {
      return res.status(400).json({ msg: "No files uploaded" });
    }
    console.log(req.files);
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { use_filename: true, folder: "samsProductPhotos" }
    );
    res
      .status(200)
      .json({ msg: { src: result.secure_url, publicID: result.public_id } });
      fs.unlinkSync(req.files.image.tempFilePath)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};

//createProducts:
const createProduct = async (req, res) => {
  const userId = req.user.userId;
  const { name, category, quantity, price, description, image, regularPrice } =
    req.body;

  if (!name || !category || !quantity || !price || !description) {
    return res.status(400).json({ msg: "Please fill out the inputs" });
  }

  const createdData = {
    name: name,
    category: category,
    quantity: quantity,
    price: price,
    description: description,
    image: image,
    regularPrice: regularPrice,
    // productViews:productViews,
    //sku:sku,
    createdBy: userId,
  };

  const products = await Products.create(createdData);

  res.status(201).json({ msg: "Product created", products });
  //res.send("Create product route");
};

//updateProducts:
const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const { name, category, quantity, price, description, image, regularPrice } =
    req.body;

  const data = {
    name,
    category,
    quantity,
    price,
    description,
    image,
    regularPrice,
  };

  try {
    const product = await Products.findOneAndUpdate({ _id: productId }, data, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json(`No product with id: ${productId}`);
    }
    res.status(201).json({ msg: "Product updated", product });
  } catch (error) {
    res.status(500).json(error);
  }
};

//deleteProducts:
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findOneAndRemove({ _id: productId });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//productReview:
const review = async (req, res) => {
  const productId = req.params.id;
  const { star, productReview } = req.body;

  //working on the date for reviewDate:
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = new Date().getDate();
  const month = new Date().getMonth();
  const adjustedMonth = months[month];

  const date = new Date();
  // console.log(date.toLocaleTimeString())
  const year = new Date().getFullYear();
  // const reviewDate = `${date}-${adjustedMonth}-${year}`;
  const reviewDate = `${day}-${adjustedMonth}-${year} ${date.toLocaleTimeString()}`;

  //console.log( `${date}-${month}-${year}`);
  //console.log( `${date}-${ex}-${year}`);

  if (!star || !productReview) {
    return res
      .status(400)
      .json({ msg: "Please drop a star and leave a review" });
  }

  try {
    const product = await Products.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }

    const ratingsExists = product.ratings.find((rating) => {
      return rating.userId === req.user.userId;
    });

    if (ratingsExists) {
      return res.status(401).json({
        msg: "You can't have more than one review for a specific product, kindly delete the other.",
      });
    }

    product.ratings.push({
      star: star,
      productReview: productReview,
      name: req.user.name,
      userId: req.user.userId,
      reviewDate: reviewDate,
    });

    await product.save();
    res.status(201).json({ msg: "Review created", product });
  } catch (error) {
    console.log(error);
  }
};

//deleteProductReview:
const deleteProductReview = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findOne({ _id: productId });

    const loggedInUserIsReviewerPoster = product.ratings.find((rating) => {
      return rating.userId === req.user.userId;
    });

    if (!loggedInUserIsReviewerPoster) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to delete this product" });
    }

    const newProductRatings = product.ratings.filter((rating) => {
      return rating.userId.toString() !== req.user.userId;
    });

    product.ratings = newProductRatings;
    await product.save();
    res.status(200).json({ msg: "Review deleted", product });
  } catch (error) {
    console.log(error);
  }
};

// updateReview:
const updateReview = async (req, res) => {
  const productId = req.params.id;

  //console.log(productId);
  const { star, productReview, userId } = req.body;
  console.log(userId);
  if (!star || !productReview) {
    return res
      .status(400)
      .json({ msg: "Please add a star and leave a review" });
  }

  // return res.status(200).json({star,productReview});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const date = new Date();
  //console.log(date.toLocaleTimeString());

  const updatedMonth = months[month];
  //console.log(`${day}-${updatedMonth}-${year}`);
  const updatedDate = `${day}-${updatedMonth}-${year} ${date.toLocaleTimeString()}`;

  try {
    const product = await Products.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({ msg: `No product with id: ${productId}` });
    }

    if (req.user.userId.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized to update review" });
    }
    const userReview = product.ratings.find((rating) => {
      return rating.userId.toString() === userId.toString();
    });
    if (!userReview) {
      return res.status(404).json({ msg: "Sorry bro, review not found" });
    }
    userReview.star = star;
    userReview.productReview = productReview;
    userReview.userId = userId;
    userReview.reviewDate = updatedDate;
    userReview.name = req.user.name;

    product.markModified("ratings");
    await product.save();
    res.status(200).json({ msg: "Review updated", product });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  upLoadProductImage,
  createProduct,
  updateProduct,
  deleteProduct,
  review,
  deleteProductReview,
  updateReview,
};
