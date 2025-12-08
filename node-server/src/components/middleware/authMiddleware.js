import jwt from 'jsonwebtoken';
import { constants } from '../../constant.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, constants.SECRET_KEY);
        req.user = decoded; // attach user id to request
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};