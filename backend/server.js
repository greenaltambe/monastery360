import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import logger from "./utils/logger.js";
import monasteryRoutes from "./routes/monastery.routes.js";
import eventRoutes from "./routes/event.routes.js";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/monasteries", monasteryRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 6666;
app.listen(PORT, () =>
  logger.info(`Server running on port ${colors.yellow(PORT)}`)
);
