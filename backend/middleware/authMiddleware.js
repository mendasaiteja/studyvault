import { User } from "../models/User.models.js";
import verifyToken from "../services/jwtservice.js";
const protect = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).json({ message: "No token provided" });
    }
    const fragments = authorization.split(" ");
    if (fragments.length !== 2 || fragments[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }
    const token = fragments[1];
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};
export default protect;