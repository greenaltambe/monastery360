import Monastery from "../models/monastery.model.js";
import asyncHandler from "express-async-handler";

const getAllMonasteries = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const totalMonasteries = await Monastery.countDocuments();

  const monasteries = await Monastery.find().skip(skip).limit(limit);

  const totalPages = Math.ceil(totalMonasteries / limit);

  res.status(200).json({
    monasteries,
    totalPages,
    currentPage: page,
    totalMonasteries,
  });
});

const getMonasteryById = asyncHandler(async (req, res) => {
  const monastery = await Monastery.findById(req.params.id);

  if (!monastery) {
    return res.status(404).json({ message: "Monastery not found" });
  }

  res.status(200).json(monastery);
});

export { getAllMonasteries, getMonasteryById };
