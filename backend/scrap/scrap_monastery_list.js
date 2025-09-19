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

async function scrapeMonasteries(url) {
  const monasteries = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $("#MonasteryListTable tr").each((i, row) => {
      const link = $(row).find("a.HyperlinkMonastery");

      const name = link.text().replace(/\s+/g, " ").trim();

      const relativeUrl = link.attr("href");
      const fullUrl = relativeUrl ? new URL(relativeUrl, url).href : null;

      const year = $(row).find("td").last().text().replace(/\s+/g, " ").trim();

      if (name && year && fullUrl) {
        console.log({ name, year, url: fullUrl });
        monasteries.push({ name, year, url: fullUrl });
      }
    });
  } catch (err) {
    console.error(err);
  }

  return monasteries;
}

for (const [region, url] of Object.entries(urls)) {
  const monasteries = await scrapeMonasteries(url);

  console.log(monasteries);
  console.log(monasteries.length);

  fs.writeFileSync(
    `monasteries_list/monasteries_${region}.json`,
    JSON.stringify(monasteries, null, 2)
  );
}

console.log("Scraping completed");
