import "../config/env.js";
import express from "express";
import cors from "cors";
import dbConnect from "../config/dbConnect.js";
import {
  brandRoutes,
  categoryRoutes,
  colorRoutes,
  couponRoutes,
  orderRoutes,
  productRoutes,
  reviewRoutes,
  userRoutes,
  stripeRoutes,
} from "../routes/index.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";

const app = express();

dbConnect();
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/webhook", stripeRoutes);

//err middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
