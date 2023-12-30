import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateBloodBank = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { bloodBankId, inventory } = verifyJWT(token);

    req.bloodBank = { bloodBankId, inventory };

    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("authentication invalid");
  }
};
