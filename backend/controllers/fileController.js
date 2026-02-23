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
     // ✅ Preview URL (inline view)
    const previewUrl = cloudinary.url(result.public_id, {
      resource_type: "image",
      format: "pdf",
      flags: "inline",
      transformation: [{ page: 1 }],
      secure: true,
    });
    const downloadUrl = result.secure_url;
    const newFile = await File.create({
      title,
      subject,
      fileUrl:previewUrl, 
      downloadUrl:downloadUrl,
      publicId: result.public_id,
      uploadedBy: req.user._id,
    });
    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getFiles = async (req, res) => {
  try {
    const files = await File.find()
      .populate("uploadedBy", "name college")
      .sort({ createdAt: -1 });
    // not logged in → hide file URL
    if (!req.user) {
      const publicFiles = files.map(file => ({
        _id: file._id,
        title: file.title,
        subject: file.subject,
        uploadedBy: file.uploadedBy,
        createdAt: file.createdAt
      }));
      return res.status(200).json(publicFiles);
    }
    // logged in → full data
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilesByUser = async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user._id })
      .populate("uploadedBy", "name college")
      .sort({ createdAt: -1 });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files uploaded" });
    }

    res.status(200).json(files);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};