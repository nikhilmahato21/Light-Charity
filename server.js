import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import AuthBloodBank from "./routes/BloodBankAuthRouter.js";
import AuthDonor from "./routes/donorAuthRouter.js";
import Donation from "./routes/donationRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateBloodBank } from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

app.use("/lightcharity/api/auth", AuthBloodBank);
app.use("/lightcharity/api/auth-donor", AuthDonor);
app.use("/lightcharity/api/blood-bank", authenticateBloodBank, Donation);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}..`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
