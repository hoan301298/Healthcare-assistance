import { verify } from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store user data (id, email) on req
        next(); // go to controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};