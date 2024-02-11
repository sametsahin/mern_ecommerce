import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

//@desc     create new product
//@route    POST /api/v1/products
//@access   Private/Admin
const create = asyncHandler(async (req, res) => {
  const convertedImgs = req.files.map((file) => file.path);
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;

  const checkExists = await Product.findOne({ name });
  if (checkExists) throw new Error("Product already exists!");
  //find the category
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound)
    throw new Error("Category not found! Please create a category first!");
  //find the brand
  const brandFound = await Brand.findOne({ name: brand?.toLowerCase() });
  if (!brandFound)
    throw new Error("Brand not found! Please create a brand first!");
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    images: convertedImgs,
  });
  //push the product into the category
  categoryFound.products.push(product._id);
  categoryFound.save();
  //push the product into the brand
  brandFound.products.push(product._id);
  brandFound.save();
  res.status(201).json({
    status: "success",
    message: "Product created successfully!",
    product,
  });
});

//@desc     get all products
//@route    GET /api/v1/products
//@access   Public
const getAll = asyncHandler(async (req, res) => {
  let productQuery = Product.find();

  //filter by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //filter by color
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }

  //filter by size
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }

  //filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");

    //gte: greater or equal
    //lte: less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startIndex = (page - 1) * limit;
  //endIdx
  const endIndex = page * limit;
  //total
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  //pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the query
  const products = await productQuery.populate("reviews");

  res.status(200).json({
    status: "success",
    message: "Product fetching is completed!",
    total,
    pagination,
    results: products.length,
    products,
  });
});

//@desc     get single product
//@route    GET /api/v1/products/:id
//@access   Public
const getSingle = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) throw new Error("Product not found!");

  res.json({
    status: "success",
    message: "Product has been fetched!",
    product,
  });
});

//@desc     update product
//@route    PUT /api/v1/products/:id
//@access   Private/admin
const update = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    },
    { new: true, runValidators: true }
  );

  res.json({
    status: "success",
    message: "Product has been updated!",
    product,
  });
});

//@desc     delete product
//@route    DELETE /api/v1/products/:id
//@access   Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error("Product not found!");

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product has been deleted!",
  });
});
export { create, getAll, getSingle, update, deleteProduct };
