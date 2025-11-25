import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
    timestamps: true,
    indexes: [
        { key: { email: 1 }, unique: true },
    ]
});

const User = model('users', userSchema);

export default User;