import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import router from './routes.js';
import { Server } from 'socket.io';
import User from './UserSchema.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//middlewar

const uri = process.env.MONGODB_URI;
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// mongodb 

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });https://chat-app-frontend-hazel.vercel.app


//   socket connect 

io.on("connect", async (socket) => {
  const userId = socket.handshake.auth.token;
  await User.findOneAndUpdate({ _id: userId }, { $set: { onlineStatus: true } });
  io.emit("userUpdate");

  socket.on("disconnect", async () => {
    await User.findOneAndUpdate({ _id: userId }, { $set: { onlineStatus: false } });
    io.emit("userUpdate");
  });
});

// app use 

app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: '*'
}));
app.use(router);