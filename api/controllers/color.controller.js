import asyncHandler from "express-async-handler";
import Color from "../models/Color.js";

//@desc     create new color
//@route    POST /api/v1/colors
//@access   Private/Admin
const create = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const checkExists = await Color.findOne({ name });
  if (checkExists) throw new Error("Color already exists!");

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.status(201).json({
    status: "success",
    message: "Color created successfully!",
    color,
  });
});

//@desc     get all colors
//@route    GET /api/v1/colors
//@access   Public
const getAll = asyncHandler(async (req, res) => {
  const colors = await Color.find();

  res.status(200).json({
    status: "success",
    message: "Colors fetching are completed!",
    colors,
  });
});

//@desc     get single color
//@route    GET /api/v1/colors/:id
//@access   Public
const getSingle = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) throw new Error("Color not found!");

  res.json({
    status: "success",
    message: "Color has been fetched!",
    color,
  });
});

//@desc     update color
//@route    PUT /api/v1/colors/:id
//@access   Private/admin
const update = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  res.json({
    status: "success",
    message: "Color has been updated!",
    color,
  });
});

//@desc     delete color
//@route    DELETE /api/v1/colors/:id
//@access   Private/admin
const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) throw new Error("Color not found!");

  await Color.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Color has been deleted!",
  });
});

export { create, getAll, getSingle, update, deleteColor };
