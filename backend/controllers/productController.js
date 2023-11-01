const Products = require("../models/products");

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

  try {
    const product = await Products.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
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
  const { star, review } = req.body;

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

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const adjustedMonth = months[month];
  const year = new Date().getFullYear();
  const reviewDate = `${date}-${adjustedMonth}-${year}`;

  
  //console.log( `${date}-${month}-${year}`);
  //console.log( `${date}-${ex}-${year}`);

  if (!star || !review) {
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
        msg: "Can't have more than one review for a specific product, kindly delete the other.",
      });
    }

    product.ratings.push({
      star: star,
      review: review,
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

    const ratingsExists = product.ratings.find((rating) => {
      return rating.userId === req.user.userId;
    });

    if (!ratingsExists) {
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
    console.log(error)
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  review,
  deleteProductReview,
};
