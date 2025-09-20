import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Monastery from "../models/monastery.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function getMonasteryData(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const monasteryData = getMonasteryData("./scrap/monasteries_details.json");

async function addMonasteryToDB(data) {
  const { heading, description, image_url, name, year, url, district } = data;

  // upload to cloudinary
  const uploaded_image = await cloudinary.uploader.upload(image_url);
  console.log("Uploaded image: ", uploaded_image);
  const monastery = new Monastery({
    name,
    district,
    heading,
    description,
    year,
    source: url,
    images: [
      {
        url: uploaded_image.secure_url, // HTTPS url
        caption: "Image from Sikkim government website",
      },
    ],
  });

  await monastery.save();
  console.log(`Saved monastery: ${name}`);
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected");

  try {
    // await Promise.all(monasteryData.map(addMonasteryToDB));
    // await addMonasteryToDB(monasteryData[0]);
    for (const monastery of monasteryData) {
      await addMonasteryToDB(monastery);
    }
    console.log("All monasteries saved successfully.");
  } catch (error) {
    console.error("An error occurred during data processing:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
}

main();
