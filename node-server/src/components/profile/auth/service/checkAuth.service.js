import User from "../../../../model/User.schema.js";
import { decrypt } from "../../../helper/cryptoFunctions.js";

const checkAuthService = async (id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            return {
                success: false,
                message: "No user match"
            }
        }

        return {
            success: true,
            message: "Authorized",
            user: {
                id: user._id,
                name: user.name,
                email: decrypt(user.encryptedEmail)
            },
        }
    } catch (error) {
        console.error("checkAuthService error:", error);
        return {
            success: false,
            message: "Internal Server Error"
        }
    }
}

export default checkAuthService;