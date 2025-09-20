import express from "express";
import {
  getAllMonasteries,
  getMonasteryById,
} from "../controllers/monastery.controllers.js";

const router = express.Router();

router.get("/getall", getAllMonasteries);
router.get("/getone/:id", getMonasteryById);

export default router;
