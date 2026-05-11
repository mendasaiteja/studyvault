import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/UploadMiddleware.js";
import {
  getFiles,
  uploadFile,
  getMyUploads
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);

// all files
router.get("/", protect, getFiles);

// files by user
router.get("/my-uploads", protect, getMyUploads);

export default router;