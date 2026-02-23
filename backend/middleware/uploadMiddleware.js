import multer from "multer";
//storing file in memory instead of disk
const storage=multer.memoryStorage();

//create upload middleware
const upload=multer({
    storage,
    limits:{filesize:10*1024*1024},//limit file upto 10mb
});
//export the middleware
export default upload;