import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    hashedEmail: { type: String, required: true, unique: true },
    encryptedEmail: { type: String, required: true, unique: true }
}, { timestamps: true });

const User = model('users', userSchema);

export default User;