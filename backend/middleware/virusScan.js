import FormData from "form-data";
import fetch from "node-fetch";

const viruScan = async (req, res, next) => {
    try {
        if (!req.file) return next();
        const formData = new FormData();
        formData.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        //sending file to virustotal
        const uploadResponse = await fetch("https://www.virustotal.com/api/v3/files", {
            method: "POST",
            headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
            body: formData,
        })
        const uploadData = await uploadResponse.json();
        const analysisId = uploadData.data?.id;// unique ID for this scan
        if (!analysisId) return next();
        // Step 3 — waiting for 70 engines to finish scanning
        await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds
        // Step 4 — getting the results using the analysis ID
        const resultResponse = await fetch(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            { headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY } }
        );
        const result = await resultResponse.json();
        const stats = result.data?.attributes?.stats;// step -5 stats looks like: { malicious: 0, suspicious: 0, clean: 68, undetected: 2 }
        const malicious = stats?.malicious || 0;
        const suspicious = stats?.suspicious || 0;
        //step-6 blocked if flagged 
        if (malicious > 0 || suspicious > 2) {
            return res.status(400).json({
                message: "File rejected — flagged as potentially harmful"
            });
        }
        // Step 7 — file is clean, continue to uploadFile
        next();
    } catch (error) {
        console.log("Virus scan error:", err.message);
        next();
    }
}
export default viruScan;