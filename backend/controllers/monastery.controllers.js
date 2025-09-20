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

export { getAllMonasteries };
