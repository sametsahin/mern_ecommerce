import express from "express";
import {
  create,
  getAll,
  getSingle,
  update,
  deleteCategory,
} from "../controllers/category.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import categoryFileUpload from "../config/categoryFileUpload.js";

const router = express.Router();

router.post("/", isLoggedIn, categoryFileUpload.single("file"), create);
router.get("/", getAll);

router.get("/:id", getSingle);
router.put("/:id", isLoggedIn, update);
router.delete("/:id", isLoggedIn, deleteCategory);

export default router;
