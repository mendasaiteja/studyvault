import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import "./config/cloudinary.js";
import { getFiles,getMyUploads } from "./controllers/fileController.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.on("error",(error)=>{
    console.log("Error",error);
    throw error;
  })

  const server=app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
  });
  server.timeout=300000;
};
startServer();