import express from "express";
import { create } from "../controllers/review.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/:productId", isLoggedIn, create);

// router
//   .route("/:id")
//   .get(getSingle)
//   .put(isLoggedIn, update)
//   .delete(isLoggedIn, deleteReview);

export default router;
