import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Monastery from "../models/monastery.model.js"; // check spelling!

// returns array of monasteries
function getMonasteryData(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const monasteryData = getMonasteryData("./monasteries_details.json");

async function addMonasteryToDB(data) {
  const { heading, description, image_url, name, year, url, district } = data;

  // upload to cloudinary
  const uploaded_image = await cloudinary.uploader.upload(image_url);

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

await Promise.all(monasteryData.map(addMonasteryToDB));
