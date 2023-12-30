import BloodBank from "../models/BloodBankModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const bank = await BloodBank.create(req.body);
  res.status(StatusCodes.OK).json({ bank });
};

export const login = async (req, res) => {
  const bloodBank = await BloodBank.findOne({ email: req.body.email });

  const isValidBloodBank =
    bloodBank && (await comparePassword(req.body.password, bloodBank.password));

  if (!isValidBloodBank) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({
    bloodBankId: bloodBank._id,
    inventory: bloodBank.inventory,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "login successfull" });
};
