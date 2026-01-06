import mongoose from 'mongoose';
import { constants } from '../../constant.js';
const Mongo_URL = constants.MONGO_URL;

if (!Mongo_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
}

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

export async function mongoConnect() {
    await mongoose.connect(Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export async function mongoDisconnect() {
    await mongoose.disconnect();
};