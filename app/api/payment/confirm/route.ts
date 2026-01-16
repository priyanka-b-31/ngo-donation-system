import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    await connectDB();

    const { paymentIntentId } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { message: "Missing paymentIntentId" },
        { status: 400 }
      );
    }

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const donationId = intent.metadata.donationId;
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return NextResponse.json(
        { message: "Donation not found" },
        { status: 404 }
      );
    }

    donation.status =
      intent.status === "succeeded" ? "SUCCESS" : "FAILED";

    donation.paymentId = intent.id;
    await donation.save();

    return NextResponse.json({
      status: donation.status,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Payment confirmation failed" },
      { status: 500 }
    );
  }
}



