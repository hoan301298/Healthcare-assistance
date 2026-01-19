import User from '../../../../model/User.schema.js';
import { compare, hash } from 'bcryptjs';
import userService from '../service/user.service.js';

class UserController {
    constructor() {}

    async getUser (req, res) {
        const { id } = req.params;
        try {
            const userDetails = await User.findOne({ id: id });
    
            if (!userDetails) {
                return res.status(401).json({ error: 'Error Fetching User' });
            }
            return res.json({userDetails});
        } catch (error) {
            res.status(500).json({error: "Internal server error"});
        }
    }

    async updateUser (req, res) {
        const { updateUser } = req.body;
        try {
            const user = await User.findOne({ username: updateUser.username});
            compare(updateUser.password, user.password, async (err, result) => {
                if (err || !result) {
                    return res.status(401).json({ error: 'Invalid password!' });
                } else {
                    updateUser.password = user.password;
                    const result = await User.updateOne(user, updateUser);
                    return res.json(`${result.modifiedCount} document(s) updated!`);
                }
            })
        } catch (error) {
            res.status(500).json({error: "Internal server error"});
        }
    }

    async resetPassword (req, res) {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
    
        const response = await userService.resetPassword(user, oldPassword, newPassword);

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(200).json(response);
    }
}

export default new UserController();