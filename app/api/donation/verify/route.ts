export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { paymentIntentId } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { message: "Payment Intent ID required" },
        { status: 400 }
      );
    }

    // Fetch payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    await connectDB();

    const donation = await Donation.findOne({
      _id: paymentIntent.metadata.donationId,
    });

    if (!donation) {
      return NextResponse.json(
        { message: "Donation not found" },
        { status: 404 }
      );
    }

    if (paymentIntent.status === "succeeded") {
      donation.status = "SUCCESS";
    } else {
      donation.status = "FAILED";
    }

    await donation.save();

    return NextResponse.json({
      message: "Donation status updated",
      status: donation.status,
    });
  } catch (error: any) {
    console.error("PAYMENT VERIFY ERROR 👉", error);
    return NextResponse.json(
      { message: "Verification failed", error: error.message },
      { status: 500 }
    );
  }
}
