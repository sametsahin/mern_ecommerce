import express from "express";
import {
  create,
  getAll,
  getSingle,
  update,
  deleteProduct,
} from "../controllers/product.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";

const router = express.Router();

router.post("/", isLoggedIn, upload.array("files"), create);
router.get("/", getAll);
router
  .route("/:id")
  .get(getSingle)
  .put(isLoggedIn, update)
  .delete(isLoggedIn, deleteProduct);

export default router;
