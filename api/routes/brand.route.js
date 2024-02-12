import express from "express";
import {
  create,
  getAll,
  getSingle,
  update,
  deleteBrand,
} from "../controllers/brand.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/", getAll);
router.post("/create", isLoggedIn, create);
router.put("/update/:id", update);
router.get("/detail/:id", getSingle);
router.delete("/delete/:id", isLoggedIn, deleteBrand);

export default router;
