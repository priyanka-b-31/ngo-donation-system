export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid donation amount" },
        { status: 400 }
      );
    }

    await connectDB();

    const donation = await Donation.create({
      userId: decoded.userId,
      amount,
      status: "PENDING",
    });

    return NextResponse.json(
      {
        message: "Donation initiated",
        donationId: donation._id,
        status: donation.status,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("DONATION CREATE ERROR 👉", error);
    return NextResponse.json(
      { message: "Donation failed", error: error.message },
      { status: 500 }
    );
  }
}
