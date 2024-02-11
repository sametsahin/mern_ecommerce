import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

//@desc     create new review
//@route    POST /api/v1/reviews
//@access   Private/Admin
const create = asyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;

  //1. find the product
  const { productId } = req.params;
  const productFound = await Product.findById(productId).populate("reviews");
  if (!productFound) throw new Error("Product not found!");

  //2. check if user already reviewed the product
  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId?.toString();
  });
  if (hasReviewed)
    throw new Error("You have already reviewed to this product!");

  //3. create review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });

  //push review into the product found
  productFound.reviews.push(review?._id);
  await productFound.save();

  res.status(201).json({
    success: true,
    message: "Review created successfully",
  });
});

export { create };
