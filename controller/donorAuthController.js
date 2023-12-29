import Donor from "../models/donorModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const donor = await Donor.create(req.body);
  res.status(StatusCodes.OK).json({ donor });
};

export const login = async (req, res) => {
  const donor = await Donor.findOne({ email: req.body.email });

  const isValidDonor =
    donor && (await comparePassword(req.body.password, donor.password));

  if (!isValidDonor) throw new UnauthenticatedError("invalid credentials");

  const donorToken = createJWT({
    donorId: donor._id,
  });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("donorToken", donorToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "login successfull" });
};
