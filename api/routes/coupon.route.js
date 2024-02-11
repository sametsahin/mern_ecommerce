import express from "express";
import {
  create,
  getAll,
  getSingle,
  update,
  deleteItem,
} from "../controllers/coupon.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/", isLoggedIn, create);
router.get("/", getAll);
router.get("/single", getSingle);

router.put("/update/:id", isLoggedIn, update);
router.delete("/delete/:id", isLoggedIn, deleteItem);

export default router;
