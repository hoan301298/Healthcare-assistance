import { decrypt } from "../../../helper/cryptoFunctions.js";

const checkAuthController = (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Authenticated",
        user: {
            id: user._id,
            name: user.name,
            email: decrypt(user.encryptedEmail)
        }
    });
}

export default checkAuthController;