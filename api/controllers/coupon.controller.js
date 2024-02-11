import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

// @desc    Create new Coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;

  const couponsExists = await Coupon.findOne({ code });
  if (couponsExists) throw new Error("Coupon already exists");

  if (isNaN(discount)) throw new Error("Discount value must be a number");

  //create coupon
  const coupon = await Coupon.create({
    code,
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });

  //send the response
  res.status(201).json({
    status: "success",
    message: "Coupon created successfully",
    coupon,
  });
});

// @desc    Get all coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin
const getAll = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    status: "success",
    message: "All coupons",
    coupons,
  });
});

// @desc    Get single coupon
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin
const getSingle = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.query.code });
  //check if is not found
  if (coupon === null) throw new Error("Coupon not found");

  //check if expired
  if (coupon.isExpired) throw new Error("Coupon Expired");

  res.json({
    status: "success",
    message: "Coupon fetched",
    coupon,
  });
});

const update = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(
    req?.params?.id,
    {
      code: code?.toUpperCase(),
      discount,
      startDate,
      endDate,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Coupon updated successfully",
    coupon,
  });
});

const deleteItem = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Coupon deleted successfully",
  });
});

export { create, getAll, getSingle, update, deleteItem };
