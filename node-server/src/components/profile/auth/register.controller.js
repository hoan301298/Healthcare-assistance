import jsonToken from 'jsonwebtoken';
import { constants } from '../../../constant.js';
import User from '../../../model/User.schema.js';
import { hashPassword } from '../../helper/auth/cryptoFunctions.js';

const registerController = async (req, res) => {
    const newUser = req.body;

    try {
        let user = await User.findOne({ email: newUser.email })
        if(!user) {
            newUser.password = hashPassword(newUser.password);
            await newUser.save();

            user = await User.findOne({ username: newUser.username});
            const token = jsonToken.sign({ id: user.id, username: user.username}, constants.SECRET_KEY);

            res.json({token});
        } else {
            return res.status(401).json({ error: 'Username has been used. Please select another!'})
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

export default registerController;

