export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Donation from "@/models/Donation";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.countDocuments({
      status: "SUCCESS",
    });

    const donationSum = await Donation.aggregate([
      { $match: { status: "SUCCESS" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return NextResponse.json({
      totalUsers,
      totalDonations,
      totalAmount: donationSum[0]?.total || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Summary fetch failed", error: error.message },
      { status: 500 }
    );
  }
}
