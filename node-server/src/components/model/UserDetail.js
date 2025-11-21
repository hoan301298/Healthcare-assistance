import { Schema, model } from 'mongoose';

const userDetailSchema =  new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true }
});

const UserDetail = model('user_details', userDetailSchema);

export default UserDetail;