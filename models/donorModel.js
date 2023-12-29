import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  bloodBank: { type: mongoose.Schema.Types.ObjectId, ref: "BloodBank" },
  quantity: { type: Number, required: true },
  donationDate: { type: Date, default: Date.now },
});
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

    donatedAt: [donationSchema],
  },

  { timestamps: true }
);

export default mongoose.model("Donor", donorSchema);
