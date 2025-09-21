import Event from "../models/events.model.js";
import asyncHandler from "express-async-handler";

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json({ message: "Get all events", events });
});

const createEvent = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, date, location, description, image } = req.body;

  if (!title || !date || !location) {
    res.status(400);
    throw new Error(
      "Please fill in all required fields: title, date, location"
    );
  }

  const newEvent = new Event({
    title,
    date,
    location,
    description,
    image,
  });

  const createdEvent = await newEvent.save();
  res
    .status(201)
    .json({ message: "Event created successfully", event: createdEvent });
});

export { getAllEvents, createEvent };
