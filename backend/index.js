import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import router from './routes.js';
import { Server } from 'socket.io';
import User from './UserSchema.js';
import Chat from './ChatSchema.js';
import getTimeStamp from './TimeStamp.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//middlewar
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(router);
const uri = process.env.MONGODB_URI;
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL]
  },
});

// mongodb 

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


const userSocket = {}

//   socket connect 

io.on("connect", async (socket) => {

  const userId = socket.handshake.auth.token;
  console.log(userId, '....', socket.id);
  await User.findOneAndUpdate({ _id: userId }, { $set: { onlineStatus: true } });
  socket.broadcast.emit("userUpdate");

  userSocket[userId] = socket.id;

  socket.on("disconnect", async () => {
    await User.findOneAndUpdate({ _id: userId }, { $set: { onlineStatus: false } });
    socket.broadcast.emit("userUpdate");

    delete userSocket[userId];
  });


  socket.on("sendmsg", (data) => {
    const roomId = data.sender_id < data.receiver_id ? data.sender_id + data.receiver_id : data.receiver_id + data.sender_id;

    socket.join(roomId);

    Chat.findOne({ room_id: roomId })
      .then((chat) => {
        if (chat) {
          chat.messages.push({
            sender: data.sender_id,
            message: data.msg,
            timeStamp: getTimeStamp()
          })

          chat.save();

        } else {

          const newChat = new Chat({
            room_id: roomId,
            messages: [{
              sender: data.sender_id,
              messages: data.msg,
              timeStamp: getTimeStamp()
            }]
          })

          newChat.save();

        }

        User.findOne({_id : data.sender_id})
        .then(usr => {
          if(usr){

            const SenderFrnd = usr.friendList.find(frnd => frnd.friend_id == data.receiver_id );
            SenderFrnd.hasChated = true;

            usr.save();

          }
        }) 

        io.to(roomId).emit('chat-update', chat);

      });
  });


});


export { io, userSocket }

