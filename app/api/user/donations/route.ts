import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET(req: Request) {
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

    const donations = await Donation.find({
      userId: decoded.userId,
    }).sort({ createdAt: -1 });

    return NextResponse.json(donations);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
