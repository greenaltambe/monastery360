import express from "express";
import { getAllEvents, createEvent } from "../controllers/event.controllers.js";

const router = express.Router();

router.get("/getall", getAllEvents);
router.post("/create", createEvent);

export default router;
