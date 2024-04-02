import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    about: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String
    },
    createdAt: {
        type: String,
        required: true
    },
    onlineStatus:{
        type: Boolean,
        required : true
    },
    friendList: [{
        friend_id : {
            type : String,
            required : true
        },
        friendFrom:{
            type : String,
            required:true
        }
    }],
    friendReq : {
        send:[
            {
                to : {
                    type : String,
                    required : true
                },
                createdAt : {
                    type : String,
                    required : true
                },
                isCompleted : {
                    type : Boolean,
                    required : true
                }
            }
        ],
        received:[
            {
                from:{
                    type : String,
                    required: true
                },
                createdAt : {
                    type : String,
                    required : true
                }
            }
        ]
    }
});

const User = mongoose.model('users', UserSchema);

export default User