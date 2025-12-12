import jwt from 'jsonwebtoken';
import { constants } from '../../constant.js';
import User from '../../model/User.schema.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, constants.SECRET_KEY);

        const user = await User.findById(decoded.id).select("_id email name");
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};