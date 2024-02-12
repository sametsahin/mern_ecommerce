import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";

//@desc     create new brand
//@route    POST /api/v1/brands
//@access   Private/Admin
const create = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brandFound = await Brand.findOne({ name });
  if (brandFound) throw new Error("Brand already exists");

  //create
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

//@desc     get all brands
//@route    GET /api/v1/brands
//@access   Public
const getAll = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.status(200).json({
    status: "success",
    message: "brands fetching are completed!",
    brands,
  });
});

//@desc     get single brand
//@route    GET /api/v1/brands/:id
//@access   Public
const getSingle = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) throw new Error("Brand not found!");

  res.json({
    status: "success",
    message: "Brand has been fetched!",
    brand,
  });
});

//@desc     update brand
//@route    PUT /api/v1/brands/update/:id
//@access   Private/admin
const update = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  res.json({
    status: "success",
    message: "Brand has been updated!",
    brand,
  });
});

//@desc     delete brand
//@route    DELETE /api/v1/brands/:id
//@access   Private/admin
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) throw new Error("Brand not found!");

  await Brand.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Brand has been deleted!",
  });
});

export { create, getAll, getSingle, update, deleteBrand };
