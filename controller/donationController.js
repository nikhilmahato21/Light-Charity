import mongoose from "mongoose";
import Donation from "../models/donationModel.js";

export const donation = async (req, res) => {
  req.body.createdBy = req.bloodBank.bloodBankId;
  const donation = await Donation.create(req.body);
  res.json({ donation });
};
export const getDonations = async (req, res) => {
  const donations = await Donation.find({
    createdBy: req.bloodBank.bloodBankId,
  });
  res.json({ donations });
};
