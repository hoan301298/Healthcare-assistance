import User from '../../../../model/User.schema.js';
import { compare, hash } from 'bcrypt';

const getUser = async (req, res) => {
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

const updateUser = async (req, res) => {
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

const resetPassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if(user) {
            compare(oldPassword, user.password, async (err, result) => {
                if(err || !result) {
                    return res.status(401).json({error: 'Your current password is wrong!'})
                } else {
                    const hashedPassword = await hash(newPassword, 12);
                    const result = await User.updateOne({username: username}, {password: hashedPassword});
                    return res.json(`${result.modifiedCount} updated!`);
                }
            })
        }
    } catch (e) {
        res.status(500).json({e: "Internal server error"});
    }
}

export { 
    getUser, 
    updateUser, 
    resetPassword 
};