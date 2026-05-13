import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/UploadMiddleware.js";
import protectgetFiles from "../middleware/protectgetFiles.js";
import {
  getFiles,
  uploadFile,
  getMyUploads
} from "../controllers/fileController.js";
import { filesCount } from "../controllers/fileController.js";
const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);

// all files
router.get("/", protectgetFiles, getFiles);

// files by user
router.get("/my-uploads", protect, getMyUploads);
router.get("/files-count", filesCount);

export default router;