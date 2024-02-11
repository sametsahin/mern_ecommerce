import express from "express";
import {
  create,
  getAll,
  getSingle,
  update,
  deleteColor,
} from "../controllers/color.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.route("/").post(isLoggedIn, create).get(getAll);
router
  .route("/:id")
  .get(getSingle)
  .put(isLoggedIn, update)
  .delete(isLoggedIn, deleteColor);

export default router;
