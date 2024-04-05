import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    room_id : {
        type : String,
        require : true
    },
    messages : [{
        sender : {
            type : String,
            required : true
        },
        message : {
            type : String,
            requried : true
        },
        timeStamp : {
            type : String,
            required : true
        }
    }]
});

const Chat = model('Chat', chatSchema);

export default Chat;