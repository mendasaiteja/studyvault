import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
// dotenv.config();
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import "../backend/config/cloudinary.js";
import { protectgetfiles } from "./middleware/protectgetFiles.js";
import { getFiles,getFilesByUser } from "./controllers/fileController.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRouter);

// const PORT = process.env.PORT || 3000;

// const startServer = async () => {
//   app.listen(PORT,"http://127.0.0.1:3000/", () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// startServer();

connectDb();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
