import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import logger from "./utils/logger.js";
import monasteryRoutes from "./routes/monastery.routes.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/monasteries", monasteryRoutes);

const PORT = process.env.PORT || 6666;
app.listen(PORT, () =>
  logger.info(`Server running on port ${colors.yellow(PORT)}`)
);
