import express from "express";
const router = express.Router();
import { checkPrice } from "../controllers/priceController.js";

router.post("/price", checkPrice);

export default router;