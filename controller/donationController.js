import mongoose from "mongoose";
import donationModel from "../models/donationModel.js";

export const donation = async (req, res) => {
  console.log(req.bloodBank);
  res.json(req.bloodBank);
};
