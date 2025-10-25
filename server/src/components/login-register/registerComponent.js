const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const UserDetail = require('../model/UserDetail');

const registerComponent = async (req, res, next) => {
    const newUserDetail = req.body;
    try {
        let user = await UserDetail.findOne({ username: newUserDetail.username})
        if(!user) {
            const hashedPassword = await bcrypt.hash(newUserDetail.password, 12);
            newUserDetail.password = hashedPassword;
            const newUser = new UserDetail(newUserDetail);
            await newUser.save();

            user = await UserDetail.findOne({ username: newUserDetail.username});
            const token = jwt.sign({ id: user.id, username: user.username}, SECRET_KEY);

            res.json({token});
        } else {
            return res.status(401).json({ error: 'Username has been used. Please select another!'})
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = registerComponent;

