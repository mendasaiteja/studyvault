import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
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

dotenv.config({
  path:"./.env"
});

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.on("error",(error)=>{
    console.log("Error",error);
    throw error;
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
  });
};
startServer();