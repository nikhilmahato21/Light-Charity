import mongoose from "mongoose";
import Donation from "../models/donationModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import Donor from "../models/donorModel.js";
import BloodBank from "../models/BloodBankModel.js";

export const donation = async (req, res) => {
  const { quantity, email } = req.body;
  let existingDonor = await Donor.findOne({ email }).select(
    " -password  -createdAt  -updatedAt -__v -dob"
  );
  console.log(existingDonor);

  if (!existingDonor) {
    // create new donor if donor doesn't exist
    const newDonor = req.body;
    newDonor.password = await hashPassword(req.body.phone);
    const createdDonor = await Donor.create(newDonor);
    // Add donation directly to the donor's donatedAt array
    createdDonor.donatedAt.push({
      bloodBank: req.bloodBank.bloodBankId,
      quantity: quantity,
      donationDate: Date.now(),
    });
    await createdDonor.save();
    //create new donation for blood bank
    delete req.body.password;
    req.body.createdBy = req.bloodBank.bloodBankId;
    await Donation.create(req.body);
  } else {
    //taking info from existing donor and creating donation for blood bank
    const addDonor = existingDonor.toObject();
    addDonor.quantity = quantity;
    addDonor.createdBy = req.bloodBank.bloodBankId;
    await Donation.create(addDonor);
    // Add donation directly to the donor's donatedAt array
    existingDonor.donatedAt.push({
      bloodBank: req.bloodBank.bloodBankId,
      quantity: quantity,
      donationDate: Date.now(),
    });
    await existingDonor.save();
  }
  //updating blood bank inventory
  await BloodBank.findOneAndUpdate(
    {
      _id: req.bloodBank.bloodBankId,
      "inventory.bloodGroup": req.body.bloodGroup || existingDonor.bloodGroup,
    },
    { $inc: { "inventory.$.quantity": quantity } },
    { new: true }
  );

  res.json({ msg: "donation successfull!!" });
};
export const getDonations = async (req, res) => {
  const donations = await Donation.find({
    createdBy: req.bloodBank.bloodBankId,
  });
  res.json({ donations });
};
