import express from "express";
import { stripeWebHook } from "../controllers/stripe.controller.js";

const router = express.Router();

router.route("/").post(stripeWebHook);

export default router;
