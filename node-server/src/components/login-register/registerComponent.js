import jsonToken from 'jsonwebtoken';
import { hash } from 'bcrypt';
import UserDetail from '../model/UserDetail.js';
import { constants } from '../../constant.js';

const registerComponent = async (req, res, next) => {
    const newUserDetail = req.body;
    try {
        let user = await UserDetail.findOne({ username: newUserDetail.username})
        if(!user) {
            const hashedPassword = await hash(newUserDetail.password, 12);
            newUserDetail.password = hashedPassword;
            const newUser = new UserDetail(newUserDetail);
            await newUser.save();

            user = await UserDetail.findOne({ username: newUserDetail.username});
            const token = jsonToken.sign({ id: user.id, username: user.username}, constants.SECRET_KEY);

            res.json({token});
        } else {
            return res.status(401).json({ error: 'Username has been used. Please select another!'})
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

export default registerComponent;

