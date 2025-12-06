import jsonToken from 'jsonwebtoken';
import { constants } from '../../../../constant.js';
import User from '../../../../model/User.schema.js';
import { encrypt, hashEmailForLookup, hashPassword } from '../../helper/auth/cryptoFunctions.js';

const registerController = async (req, res) => {
    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body;

    if (!email || !password || !name || !confirmPassword && (password !== confirmPassword)) {
        res.status(500).json({ message: "Fields are missing"})
    }

    try {
        const hashedEmail = hashEmailForLookup(email);
        let user = await User.findOne({ hashedEmail: hashedEmail })

        if(!user) {
            const newUser = new User({
                name,
                hashedEmail: hashedEmail,
                encryptedEmail: encrypt(email),
                password: hashPassword(password)
            });

            user = await newUser.save();
            const token = jsonToken.sign({ id: user.id, email : email }, constants.SECRET_KEY);

            res.json({token});
        } else {
            return res.status(401).json({ error: 'Username has been used. Please select another!'})
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

export default registerController;