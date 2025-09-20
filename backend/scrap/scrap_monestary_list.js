import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const urls = {
  East: "http://sikkimeccl.gov.in/History/Monasteries/East/EasMonasterytList.aspx",
  West: "http://sikkimeccl.gov.in/History/Monasteries/West/WestMonasteryList.aspx",
  North:
    "http://sikkimeccl.gov.in/History/Monasteries/North/NorthMonasteryList.aspx",
  South:
    "http://sikkimeccl.gov.in/History/Monasteries/South/SouthDistrictMonasteryList.aspx",
};

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

async function scrapeMonasteries(url, region) {
  const monasteries = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $("#MonasteryListTable tr").each((i, row) => {
      const link = $(row).find("a.HyperlinkMonastery");

      const rawName = link.text().replace(/\s+/g, " ").trim();
      const name = toTitleCase(rawName);

      const relativeUrl = link.attr("href");
      const fullUrl = relativeUrl ? new URL(relativeUrl, url).href : null;

      const year = $(row).find("td").last().text().replace(/\s+/g, " ").trim();

      if (name && year && fullUrl) {
        monasteries.push({ name, year, url: fullUrl, district: region });
      }
    });
  } catch (err) {
    console.error(err);
  }

  return monasteries;
}

async function main() {
  const allMonasteries = [];

  for (const [region, url] of Object.entries(urls)) {
    const monasteries = await scrapeMonasteries(url, region);
    console.log(`${region}: ${monasteries.length} monasteries scraped`);
    allMonasteries.push(...monasteries);
  }

  fs.writeFileSync(
    "monasteries_list/monasteries_all.json",
    JSON.stringify(allMonasteries, null, 2)
  );

  console.log(
    `Scraping completed. Total monasteries: ${allMonasteries.length}`
  );
}

main();
