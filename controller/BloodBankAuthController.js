import BloodBank from "../models/BloodBankModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.hashedPassword, salt);
  req.body.password = hashedPassword;
  const bank = await BloodBank.create(req.body);
  res.status(StatusCodes.OK).json({ bank });
};

export const login = async (req, res) => {
  res.status(StatusCodes.OK).send("login successfull");
};
