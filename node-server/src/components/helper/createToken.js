import jwt from 'jsonwebtoken';
import { constants } from '../../constant.js';

const EXPIRED_DAY = "1d";
const SECRET_KEY = constants.SECRET_KEY;

export function createToken(id) {
    return jwt.sign(
        { id: id },
        SECRET_KEY,
        { expiresIn: EXPIRED_DAY }
    )
}