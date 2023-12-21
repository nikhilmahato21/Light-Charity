import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import AuthBloodBank from "./routes/BloodBankAuthRouter.js";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/lightcharity/api/auth", AuthBloodBank);

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
