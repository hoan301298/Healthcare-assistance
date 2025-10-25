const { Schema, model} = require('mongoose');

// Define the schema for the User model
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

module.exports = UserDetail;