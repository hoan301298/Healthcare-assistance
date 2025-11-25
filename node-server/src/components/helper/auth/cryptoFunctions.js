import crypto from 'crypto';
import { constants } from '../../../constant.js';

const ALGO = 'aes-256-gcm';
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const ENCRYPT_KEY = constants.ENCRYPT_KEY;
const EMAIL_HASH_SALT = constants.EMAIL_HASH_SALT;
const PASSWORD_HASH_SALT = constants.PASSWORD_HASH_SALT;

function prepareKey(key) {
    if (Buffer.isBuffer(key)) {
        if (key.length !== KEY_LENGTH) {
            throw new Error(`Key must be exactly ${KEY_LENGTH} bytes for AES-256`);
        }
        return key;
    }
    
    if (typeof key === 'string') {
        const keyBuffer = Buffer.from(key, 'hex');
        if (keyBuffer.length !== KEY_LENGTH) {
            throw new Error(`Key must be ${KEY_LENGTH * 2} hex characters (${KEY_LENGTH} bytes) for AES-256`);
        }
        return keyBuffer;
    }
    
    throw new Error('Key must be a string or Buffer');
}

export function encrypt(text) {
    try {
        const keyBuffer = prepareKey(ENCRYPT_KEY);
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGO, keyBuffer, iv);

        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        const authTag = cipher.getAuthTag().toString('base64');

        return `${iv.toString('base64')}:${authTag}:${encrypted}`;
    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
}

export function decrypt(data) {
    try {
        const parts = data.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted data format');
        }

        const [ivB64, tagB64, encrypted] = parts;
        const keyBuffer = prepareKey(ENCRYPT_KEY);
        const iv = Buffer.from(ivB64, 'base64');
        const tag = Buffer.from(tagB64, 'base64');

        const decipher = crypto.createDecipheriv(ALGO, keyBuffer, iv);
        decipher.setAuthTag(tag);

        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
}

export function hashEmailForLookup(email) {
    return crypto
        .createHmac('sha256', EMAIL_HASH_SALT)
        .update(email.toLowerCase().trim())
        .digest('hex');
}

export function verifyEmail(inputEmail, storedHash) {
    const inputHash = hashEmailForLookup(inputEmail);
    return crypto.timingSafeEqual(
        Buffer.from(inputHash),
        Buffer.from(storedHash)
    )
}

export function hashPassword(password) {
    return crypto
        .pbkdf2Sync(password, PASSWORD_HASH_SALT, 100000, 32, 'sha256')
        .toString('hex');
}

export function verifyPassword(inputPassword, storedHash) {
    const inputHash = hashPassword(inputPassword);
    return crypto.timingSafeEqual(
        Buffer.from(inputHash),
        Buffer.from(storedHash)
    );
}