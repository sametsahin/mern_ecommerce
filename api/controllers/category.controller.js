import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

//@desc     create new category
//@route    POST /api/v1/categories
//@access   Private/Admin
const create = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const checkExists = await Category.findOne({ name });
  if (checkExists) throw new Error("Category already exists!");

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req?.userAuthId,
    image: req?.file?.path,
  });
  res.status(201).json({
    status: "success",
    message: "Category created successfully!",
    category,
  });
});

//@desc     get all categories
//@route    GET /api/v1/categories
//@access   Public
const getAll = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "category fetching is completed!",
    categories,
  });
});

//@desc     get single category
//@route    GET /api/v1/categories/:id
//@access   Public
const getSingle = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new Error("Category not found!");

  res.json({
    status: "success",
    message: "Category has been fetched!",
    category,
  });
});

//@desc     update category
//@route    PUT /api/v1/categories/:id
//@access   Private/admin
const update = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  res.json({
    status: "success",
    message: "Category has been updated!",
    category,
  });
});

//@desc     delete category
//@route    DELETE /api/v1/categories/:id
//@access   Private/admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new Error("Category not found!");

  await Category.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Category has been deleted!",
  });
});

export { create, getAll, getSingle, update, deleteCategory };
