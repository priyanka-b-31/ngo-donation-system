import mongoose, { Schema, model, models } from "mongoose";

const DonationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Donation = models.Donation || model("Donation", DonationSchema);
export default Donation;
