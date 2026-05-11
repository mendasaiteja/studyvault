import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

const protectgetfiles = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(); // no token → continue as public user
        }

        if (!authHeader.startsWith("Bearer")) {
            return next();
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        next(); // invalid token → treat as public
    }
};

export default protectgetfiles;