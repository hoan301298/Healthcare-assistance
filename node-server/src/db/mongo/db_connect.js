import mongoose from 'mongoose';
import { constants } from '../../constant.js';

let isConnected = false;

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function mongoConnect() {
  if (cached.conn) return cached.conn;

  if (!constants.MONGO_URL) {
    throw new Error("MONGO_URL not defined in environment variables!");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(constants.MONGO_URL)
      .then((mongoose) => mongoose);
  }

  isConnected = true;
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function mongoDisconnect() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('🔌 MongoDB disconnected');
  }
}

