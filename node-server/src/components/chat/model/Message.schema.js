import { Schema } from 'mongoose';

export const messageDetailSchema = new Schema({
    id: { type: String, required: true },
    sender: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date, required: true }
});