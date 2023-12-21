import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    dob: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    donated: Number,
    donatedAt: [],
    date: Date,
  },

  { timestamps: true }
);

export default mongoose.model("Donor", Donor);
