import { NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const donation = await Donation.create({
      userId: user._id,
      userEmail: user.email,
      amount,
      status: "PENDING",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      metadata: {
        donationId: donation._id.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation._id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Payment initiation failed" },
      { status: 500 }
    );
  }
}





