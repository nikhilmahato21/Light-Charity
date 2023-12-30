import { Router } from "express";
import { donation, getDonations } from "../controller/donationController.js";
const router = Router();

router.post("/donation", donation);
router.get("/donations", getDonations);

export default router;
