import Stripe from "stripe";
import Order from "../models/Order.js";

export default function (app, express) {
  //stripe webhook
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("event");
      } catch (err) {
        console.log("err", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
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

      // Return a 200 response to acknowledge receipt of the event
      res.send();
    }
  );
}
