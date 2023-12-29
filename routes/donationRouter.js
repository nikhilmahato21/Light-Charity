import { Router } from "express";
import { donation } from "../controller/donationController.js";
const router = Router();

router.post("/donation", donation);

export default router;
