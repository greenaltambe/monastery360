import express from "express";
import { getAllMonasteries } from "../controllers/monastery.controllers.js";

const router = express.Router();

router.get("/getall", getAllMonasteries);

export default router;
