const User = require('../model/UserDetail');
const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
    const { username } = req.query;
    try {
        const userDetails = await User.findOne({ username: username });
        console.log(userDetails)
        if (!userDetails) {
            return res.status(401).json({ error: `Error Fetching User ${username}` });
        }
        return res.json({userDetails});
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

const updateUserDetails = async (req, res) => {
    const { updateUser } = req.body;
    try {
        const user = await User.findOne({ username: updateUser.username});
        bcrypt.compare(updateUser.password, user.password, async (err, result) => {
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
            bcrypt.compare(oldPassword, user.password, async (err, result) => {
                if(err || !result) {
                    return res.status(401).json({error: 'Your current password is wrong!'})
                } else {
                    const hashedPassword = await bcrypt.hash(newPassword, 12);
                    const result = await User.updateOne({username: username}, {password: hashedPassword});
                    return res.json(`${result.modifiedCount} updated!`);
                }
            })
        }
    } catch (e) {
        res.status(500).json({e: "Internal server error"});
    }
}

module.exports = { getProfile, updateUserDetails, resetPassword };