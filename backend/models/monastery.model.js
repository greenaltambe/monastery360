import mongoose from "mongoose";

const monasterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
    enum: ["East", "West", "North", "South"],
    required: true,
  },
  heading: {
    type: String, // Full heading from monastery page
  },
  description: {
    type: [String], // Array of paragraphs
    default: [],
  },
  year: {
    type: String, // establishment year (e.g., "1734 A.D")
  },
  founder: {
    type: String, // optional, can add later if extracted
  },
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  images: [
    {
      url: { type: String, required: true }, // Cloudinary URL
      caption: { type: String, default: "" },
    },
  ],
  virtualTourUrl: {
    type: String, // field for the virtual tour URL
    default: null,
  },
  source: {
    type: String, // original monastery page URL
    required: true,
  },
});

export default mongoose.model("Monastery", monasterySchema);
