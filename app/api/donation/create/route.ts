import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1️⃣ Get token from header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };

    // 3️⃣ Get request body
    const { amount } = await req.json();
    if (!amount) {
      return NextResponse.json(
        { message: "Amount is required" },
        { status: 400 }
      );
    }

    // 4️⃣ Fetch user (to get email)
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 5️⃣ Create donation (SAVE EMAIL 🔥)
    const donation = await Donation.create({
      userId: user._id,
      userEmail: user.email,
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

