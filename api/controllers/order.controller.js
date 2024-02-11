import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

//stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//@desc     create new order
//@route    POST /api/v1/orders
//@access   Private/Admin
const createOrd = asyncHandler(async (req, res) => {
  //get the coupon
  // const { coupon } = req.query;
  // const couponFound = await Coupon.findOne({
  //   code: coupon?.toUpperCase(),
  // });

  // if (couponFound?.isExpired) throw new Error("Coupon has expired!");
  // if (!couponFound) throw new Error("Coupon does not exists!");

  // get discount
  // const discount = couponFound?.discount / 100;

  // get the payload(customer, orderItems, shippingAddress, totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;

  //find the user
  const user = await User.findById(req.userAuthId);
  if (!user.hasShippingAddress)
    throw new Error("Please provide shipping address");

  if (orderItems?.length < 1) throw new Error("No Order Items!");

  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === order._id?.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });
  user.orders.push(order?._id);
  await user.save();

  //make payment (stripe)
  //convert order items to have same structure that stripe need
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    // automatic_tax: { enabled: true },
  });

  res.send({ url: session.url });
});

//@desc     get all orders
//@route    GET /api/v1/orders
//@access   Private
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json({ success: true, message: "All Orders", orders });
});

//@desc     get single order
//@route    GET /api/v1/orders/:id
//@access   Private
const getSingleOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  res.json({ success: true, message: "Single Order", order });
});

//@desc     update order status
//@route    GET /api/v1/orders/update/:id
//@access   Private/admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: req.body.status },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Order updated!",
    updatedOrder,
  });
});

//@desc     get all order sales
//@route    GET /api/v1/orders/sales
//@access   Private
const orderStats = asyncHandler(async (req, res) => {
  //get order stats
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        minSale: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maxSale: {
          $max: "$totalPrice",
        },
        avgSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  //get the date
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  //send response
  res.status(200).json({
    success: true,
    message: "Sum of orders",
    orders,
    saleToday,
  });
});

export {
  createOrd,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  orderStats,
};
