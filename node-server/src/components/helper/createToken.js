import jwt from 'jsonwebtoken';
import { constants } from '../../constant';

EXPIRED_DAY = "1d";
SECRET_KEY = constants.SECRET_KEY;

export function createToken(id) {
    return jwt.sign(
        { id: id },
        SECRET_KEY,
        { expiresIn: EXPIRED_DAY }
    )
}