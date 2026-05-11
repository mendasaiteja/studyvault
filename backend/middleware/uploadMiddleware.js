import multer from "multer";
//storing file in memory instead of disk
const storage=multer.memoryStorage();

//create upload middleware
const upload=multer({
    storage,
    limits:{filesize:50*1024*1024},//limit file upto 10mb
    fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX, PPT, PPTX files are allowed"));
    }
  },
});
//export the middleware
export default upload;