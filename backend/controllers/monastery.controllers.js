import Monastery from "../models/monastery.model.js";
import asyncHandler from "express-async-handler";

const getAllMonasteries = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const skip = (page - 1) * limit;

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { district: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const totalMonasteries = await Monastery.countDocuments(filter);

  const monasteries = await Monastery.find(filter).skip(skip).limit(limit);

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

const getMonasteriesWithLocation = asyncHandler(async (req, res) => {
  const monasteries = await Monastery.find({
    "location.latitude": { $exists: true, $ne: null },
    "location.longitude": { $exists: true, $ne: null },
  });
  res.status(200).json({ message: "Monasteries with location", monasteries });
});

const updateMonastery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const monastery = await Monastery.findById(id);

  if (!monastery) {
    res.status(404);
    throw new Error("Monastery not found");
  }

  const updatedMonastery = await Monastery.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedMonastery);
});

export {
  getAllMonasteries,
  getMonasteryById,
  getMonasteriesWithLocation,
  updateMonastery,
};
