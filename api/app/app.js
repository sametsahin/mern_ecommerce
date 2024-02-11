import "../config/env.js";
import express from "express";
import cors from "cors";
import dbConnect from "../config/dbConnect.js";
import stripeWebhook from "../utils/stripeWebhook.js";
import {
  brandRoutes,
  categoryRoutes,
  colorRoutes,
  couponRoutes,
  orderRoutes,
  productRoutes,
  reviewRoutes,
  userRoutes,
} from "../routes/index.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";

const app = express();

//initializes
dbConnect();
stripeWebhook(app, express);
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/coupons", couponRoutes);

//err middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
