import jsonToken from 'jsonwebtoken';
import { constants } from '../../constant.js';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
    }  
    
    jsonToken.verify(token, constants.SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        return res.json(user);
    });
};

export default authenticateToken;