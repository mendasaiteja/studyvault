import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import protectgetFiles from "../middleware/protectgetfiles.js"
import { deleteFile } from "../controllers/fileController.js";

import {
  getFiles,
  uploadFile,
  getMyUploads
} from "../controllers/fileController.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";

import { filesCount } from "../controllers/fileController.js";
import contentScreen from "../middleware/contentScreen.js";
import viruScan from "../middleware/virusScan.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), contentScreen,viruScan, uploadFile);

// all files
router.get("/", protectgetFiles, getFiles);

// files by user
router.get("/my-uploads", protect, getMyUploads);
router.get("/files-count", filesCount);
router.delete("/:id", protect, deleteFile);

export default router;