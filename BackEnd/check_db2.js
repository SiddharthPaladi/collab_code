import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;
const chats = await db.collection('chats').find().sort({ createdAt: -1 }).limit(3).toArray();
console.log(JSON.stringify(chats, null, 2));
process.exit(0);
