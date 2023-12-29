import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: Number, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    quantity: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "BloodBank" },
  },

  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
