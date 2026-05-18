import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { File } from "../models/File.models.js";

export const uploadFile = async (req, res) => {
  try {
    const { title, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "studyvault",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    // normalize to raw/upload in case cloudinary returns image/upload
    const downloadUrl = result.secure_url
      .replace("/image/upload/", "/raw/upload/");

    console.log("result.secure_url:", result.secure_url);
    console.log("downloadUrl:", downloadUrl);

    const newFile = await File.create({
      title,
      subject,
      fileUrl: downloadUrl,
      downloadUrl: downloadUrl,
      publicId: result.public_id,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    console.log("uploadFile error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find()
      .populate("uploadedBy", "name college")
      .sort({ createdAt: -1 });

    if (!req.user) {
      const publicFiles = files.map(file => ({
        _id: file._id,
        title: file.title,
        subject: file.subject,
        uploadedBy: file.uploadedBy,
        createdAt: file.createdAt,
      }));
      return res.status(200).json(publicFiles);
    }

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyUploads = async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user._id })
      .populate("uploadedBy", "name college")
      .sort({ createdAt: -1 });

    if (files.length === 0) {
      return res.status(404).json({ message: "No files uploaded" });
    }

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filesCount = async (req, res) => {
  try {
    const count = await File.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user._id,  
    });

    if (!file) {
      return res.status(404).json({ message: "File not found or unauthorized" });
    }

    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: "raw",
    });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};