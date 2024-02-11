import express from "express";
import {
  createOrd,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  orderStats,
} from "../controllers/order.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/", isLoggedIn, createOrd);
router.get("/", isLoggedIn, getAllOrders);
router.get("/:id", isLoggedIn, getSingleOrder);
router.put("/update/:id", isLoggedIn, updateOrderStatus);
router.get("/sales/stats", isLoggedIn, orderStats);

export default router;
