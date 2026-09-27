import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;
await db.collection('chats').insertOne({
  project: new mongoose.Types.ObjectId('6859018f864b6b537c3a250f'),
  sender: new mongoose.Types.ObjectId('67d2f7756e31b0c7d1a56e76'),
  email: 'hehe@hehe.com',
  message: '@ai why are 0 items displayed in /items',
  files: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0
});
console.log("Trigger inserted");
process.exit(0);
