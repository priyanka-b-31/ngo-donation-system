export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { donationId } = await req.json();

    if (!donationId) {
      return NextResponse.json(
        { message: "Donation ID required" },
        { status: 400 }
      );
    }

    await connectDB();

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return NextResponse.json(
        { message: "Donation not found" },
        { status: 404 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: donation.amount * 100,
      currency: "inr",
      metadata: {
        donationId: donation._id.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("STRIPE INTENT ERROR 👉", error);
    return NextResponse.json(
      { message: "Stripe payment failed", error: error.message },
      { status: 500 }
    );
  }
}
