import User from "../../../../model/User.schema.js";
import { hashPassword, verifyPassword } from "../../../helper/cryptoFunctions.js";

class UserService {
    constructor() {
        this.userModel = User;
    }

    async resetPassword(user, oldPassword, newPassword) {
        try {
            const isMatched = await verifyPassword(oldPassword, user.password);
            if (!isMatched) {
                return {
                    success: false,
                    message: "Wrong old password!"
                }
            }

            const hashedNewPassword = await hashPassword(newPassword);
            await this.userModel.updateOne(
                { _id: user._id },
                { $set: { password: hashedNewPassword } }
            );

            return {
                success: true,
                message: "Password reset successfully"
            };

        } catch (error) {
            console.error("Reset password error: ", error);
            return {
                success: false,
                message: "Reset password error"
            }
        }
    }
}

export default new UserService();