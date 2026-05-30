const spamKeywords = [
  "porn", "xxx", "nude", "hack", "crack", "keygen",
  "free money", "click here", "casino", "viagra",
  "malware", "virus", "ransomware", "phishing"
];

const contentScreen=(req,res,next)=>{
    const title=req.body.title?.toLowerCase()||"";
    const filename=req.file?.originalname?.toLowerCase()||"";
    const isSpam=spamKeywords.some(
        keyword=>title.includes(keyword)||filename.includes(keyword)
    );
    if(isSpam){
        return res.status(400).json({ message: "File rejected — looks like spam" });
    }
    next();
};
export default contentScreen;
