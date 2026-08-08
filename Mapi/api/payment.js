import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const order = await razorpay.orders.create({
      amount: 19900, // ₹199
      currency: "INR",
      receipt: "ultraai_premium"
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Payment order create नहीं हो पाया।"
    });

  }
}
