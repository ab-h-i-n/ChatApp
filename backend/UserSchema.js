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
    }
});

const User = mongoose.model('users', UserSchema);

export default User