import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import { URL } from "url";

const monasteries = JSON.parse(
  fs.readFileSync("./monasteries_list/monasteries_East.json", "utf-8")
);
const monastery_details = [];

async function scrapeMonasteriesDetails(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const container = $(".TextContainer");

    // Heading
    const heading = container.find(".HeadingText").text().trim();

    // Description paragraphs
    const paragraphs = [];
    container.find("table tbody tr td div").each((i, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text) paragraphs.push(text);
    });

    // Image
    const image_src = container.find("img").attr("src");
    const image_url = image_src ? new URL(image_src, url).href : null;

    const monastery = {
      heading,
      description: paragraphs,
      image_url,
    };

    console.log(monastery);
  } catch (err) {
    console.error(err);
  }
}

scrapeMonasteriesDetails(monasteries[0].url);
