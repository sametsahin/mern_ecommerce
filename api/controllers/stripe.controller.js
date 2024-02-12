import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const convertOrderToStripe = async (orderItems) => {
  orderItems.map((item) => {
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
};

const createSessionMethod = async (order, convertedData) => {
  const session = await stripe.checkout.sessions.create({
    line_items: convertedData,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    // automatic_tax: { enabled: true },
  });
  return session;
};

const stripeWebHook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("webhook");
  } catch (err) {
    console.log("err", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    //update the order
    const session = event.data.object;
    const { orderId } = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    //find the order
    const order = await Order.findByIdAndUpdate(
      JSON.parse(orderId),
      {
        totalPrice: totalAmount / 100,
        currency,
        paymentMethod,
        paymentStatus,
      },
      {
        new: true,
      }
    );
    console.log(order);
  } else {
    return;
  }

  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // // Return a 200 response to acknowledge receipt of the event
  res.send();
};

export { convertOrderToStripe, createSessionMethod, stripeWebHook };
