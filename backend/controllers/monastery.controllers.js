import logger from "../utils/logger.js";
import colors from "colors";
import Monastery from "../models/monastery.model.js";
import asyncHandler from "express-async-handler";

const getAllMonasteries = asyncHandler(async (req, res) => {
  const monasteries = await Monastery.find();
  res.status(200).json(monasteries);
});

export { getAllMonasteries };
