import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateBloodBank = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(req);
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { bloodBankID, inventory } = verifyJWT(token);
    req.bloodBank = { bloodBankID, inventory };
    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("authentication invalid");
  }
};
