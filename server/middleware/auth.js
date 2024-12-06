import jwt from "jsonwebtoken";
import config from "config";

export default function (req, res, next) {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication error" });
    }
    const decoded = jwt.verify(token, config.get("secretKey"));
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Authentication error" });
  }
}
