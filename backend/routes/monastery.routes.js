import express from "express";
import {
  getAllMonasteries,
  getMonasteryById,
  getMonasteriesWithLocation,
  updateMonastery,
} from "../controllers/monastery.controllers.js";

const router = express.Router();

router.get("/getall", getAllMonasteries);
router.get("/getone/:id", getMonasteryById);
router.get("/getwithlocation", getMonasteriesWithLocation);
router.put("/update/:id", updateMonastery);

export default router;
