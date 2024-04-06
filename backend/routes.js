import express from 'express';
import User from './UserSchema.js';
import getTimeStamp from './TimeStamp.js';
import bcrypt, { hash } from 'bcrypt'
import { io, userSocket } from './index.js';
import Chat from './ChatSchema.js';
import { Types } from 'mongoose';

const ObjectId =  Types.ObjectId;

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server working correctly!');
});

router.post('/signup', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(404).json({
                    data: null,
                    error: "User already exsist!"
                });
            } else {

                const saltValue = 10;

                bcrypt.hash(req.body.password, saltValue, (err, hash) => {
                    if (err) {
                        res.status(404).json({
                            data: null,
                            error: "Failed to encrypt password!"
                        })
                    } else {

                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            about: 'none',
                            password: hash,
                            profilePhoto: req.body.profilePhoto,
                            createdAt: getTimeStamp(),
                            onlineStatus: false
                        });


                        newUser.save()
                            .then(user => {
                                res.json({
                                    data: {
                                        _id: user._id
                                    },
                                    error: null
                                })
                            })
                            .catch(error => {

                                res.status(404).json({
                                    data: null,
                                    error: "Failed to create user!"
                                });

                            })

                    }
                })

            }
        })
        .catch(error => {
            res.status(404).json({
                data: null,
                error: "Failed to fetch user!"
            })
        })


})

router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {

            if (user) {
                bcrypt.compare(req.body.password, user.password, (error, result) => {

                    if (error) {

                        res.status(404).json({
                            data: null,
                            error: 'Error compareing passward!'
                        })
                    } else {

                        if (result) {

                            res.json({
                                data: {
                                    _id: user._id
                                },
                                error: null
                            })

                        } else {

                            res.status(404).json({
                                data: null,
                                error: "Password does not match!"
                            })

                        }

                    }

                })
            } else {
                res.status(404).json({
                    data: null,
                    error: "User not found!"
                })
            }

        })
        .catch(error => {
            res.status(404).json({
                data: null,
                error: "Failed to fetch user!"
            })
        })

})

router.post('/checkuserexist', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.json({
                    message: "User exists!"
                })
            } else {
                res.status(404).json({
                    message: "User does not exists!"
                })
            }
        })
        .catch(error => {
            res.status(404).json({
                message: "Failed to fetch user"
            })
        })

})

router.get('/getuser/:id', (req, res) => {

    const id = req.params.id;

    User.findOne({ _id: id })
        .then(user => {
            if (user) {
                res.json({
                    data: {
                        _id: user._id,
                        name: user.name,
                        about: user.about,
                        email: user.email,
                        profilePhoto: user.profilePhoto,
                        createdAt: user.createdAt,
                        onlineStatus: user.onlineStatus,
                        friendList: user.friendList
                    },
                    error: null
                })
            } else {
                res.status(404).json({
                    data: null,
                    error: "User does not exists!"
                })
            }
        })
        .catch(error => {
            res.status(404).json({
                data: null,
                error: "User does not exists!"
            })
        })

})

router.get('/getuserprofile/:id', (req, res) => {

    const id = req.params.id;

    User.findOne({ _id: id })
        .then(user => {
            if (user) {
                res.json({
                    data: {
                        _id: user._id,
                        name: user.name,
                        about: user.about,
                        profilePhoto: user.profilePhoto,
                        onlineStatus: user.onlineStatus,
                    },
                    error: null
                })
            } else {
                res.status(404).json({
                    data: null,
                    error: "User does not exists!"
                })
            }
        })
        .catch(error => {
            res.status(404).json({
                data: null,
                error: "User does not exists!"
            })
        })

})

router.post('/allusers', (req, res) => {
    const currentUser = req.body._id;

    User.find({ _id: { $ne: currentUser } }, '_id name about profilePhoto onlineStatus friendList')
        .then(users => {
            res.json({
                data: users,
                error: null
            });
        })
        .catch(error => {
            res.status(404).json({
                data: null,
                error: "Failed to find users!"
            });
        });
});

router.get('/getfriendslist/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({ _id: id });

        if (user) {
            res.json({
                error: null,
                data: user.friendList
            });
        } else {
            res.status(404).json({
                error: 'User not found!',
                data: null
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error!',
            data: null
        });
    }
});

router.put('/edit/:key', (req, res) => {

    const key = req.params.key;

    User.findOne({ _id: req.body._id })
        .then(user => {

            if (user) {

                switch (key) {
                    case "name":
                        user.name = req.body.name
                        break;
                    case "about":
                        user.about = req.body.about
                        break;
                    case "profilePhoto":
                        user.profilePhoto = req.body.profilePhoto
                        break
                    default:
                        res.status(404).json({
                            data: null,
                            error: 'Invalid key!'
                        })
                        return;
                }

                user.save().then(updatedUser => {
                    res.json({
                        error: null,
                        data: {
                            _id: updatedUser._id,
                            createdAt: updatedUser.createdAt,
                            name: updatedUser.name,
                            about: updatedUser.about,
                            profilePhoto: updatedUser.profilePhoto,
                            email: updatedUser.email,
                            onlineStatus: updatedUser.onlineStatus
                        }
                    })
                })

            } else {
                res.status(404).json({
                    data: null,
                    error: 'User not found!'
                })
            }

        })
})

router.post('/sendfriendreq', async (req, res) => {
    try {
        const sender = await User.findOne({ _id: req.body.from });
        const recipient = await User.findOne({ _id: req.body.to });

        if (!sender || !recipient) {
            return res.status(404).json({
                error: 'Sender or recipient not found!',
                data: null
            });
        }

        const isReqAvailabe = sender.friendReq.send.find(requ => requ.to == req.body.to);

        if (isReqAvailabe) {
            res.status(404).json({
                error: 'Friend request already sended!',
                data: null
            })

            return;
        }

        sender.friendReq.send.push({
            to: req.body.to,
            createdAt: getTimeStamp(),
            isRejected: false
        });
        await sender.save();

        recipient.friendReq.received.push({
            from: req.body.from,
            createdAt: getTimeStamp(),
        });
        await recipient.save();


        io.to(userSocket[recipient._id]).emit("friendRequest");
        io.to(userSocket[sender._id]).emit("friendRequest");

        return res.json({
            error: null,
            data: 'Friend request sent successfully!'
        });


    } catch (error) {
        console.error('Failed to send request:', error);
        return res.status(500).json({
            error: 'Failed to send request!',
            data: null
        });
    }
});

router.get('/getfriendreq/:id', (req, res) => {

    try {

        const id = req.params.id;

        User.findOne({ _id: id })
            .then(user => {

                if (user) {

                    res.json({
                        error: null,
                        data: user.friendReq
                    })

                } else {

                    res.status(404).json({
                        error: 'User not found!',
                        data: null
                    })
                }

            })

    } catch (error) {

        res.status(404).json({
            error: error,
            data: null
        })
    }
})

router.delete('/rejectfriendreq', async (req, res) => {

    try {

        const receiver = await User.findOne({ _id: req.body._id });
        const sender = await User.findOne({ _id: req.body.sender_id });

        if (!receiver || !sender) {
            res.status(404).json({
                data: null,
                error: 'Sender of receiver not found!'
            })
            return;
        }


        const request = await receiver.friendReq.received.find(requ => requ.from == req.body.sender_id)
        await receiver.friendReq.received.pull(request);
        await receiver.save();

        const senderrequest = await sender.friendReq.send.find(requ => requ.to == req.body._id && requ.isRejected == false)
        senderrequest.isRejected = true;
        await sender.save();

        io.to(userSocket[req.body._id]).emit("friendRequest");
        io.to(userSocket[req.body.sender_id]).emit("friendRequest");

        res.json({
            data: "Request rejected!",
            error: null
        })

    } catch (error) {
        res.status(404).json({
            data: null,
            error: error
        })
    }

})

router.post('/acceptfriendreq', async (req, res) => {

    try {

        const receiver = await User.findOne({ _id: req.body._id });
        const sender = await User.findOne({ _id: req.body.sender_id });

        if (!receiver || !sender) {
            res.status(404).json({
                data: null,
                error: 'Sender of receiver not found!'
            })
            return;
        }

        //remove request
        const request = await receiver.friendReq.received.find(requ => requ.from == req.body.sender_id)
        await receiver.friendReq.received.pull(request);

        //add to firendlist
        receiver.friendList.push({
            friend_id: req.body.sender_id,
            friendFrom: getTimeStamp(),
            hasChated:false
        })

        await receiver.save();

        //remove request
        const senderrequest = await sender.friendReq.send.find(requ => requ.to == req.body._id && requ.isRejected == false)
        await sender.friendReq.send.pull(senderrequest);

        //add to friendlist
        sender.friendList.push({
            friend_id: req.body._id,
            friendFrom: getTimeStamp(),
            hasChated:false
        })

        await sender.save();

        io.to(userSocket[req.body._id]).emit("friendList");
        io.to(userSocket[req.body.sender_id]).emit("friendList");
        io.to(userSocket[req.body._id]).emit("friendRequest");
        io.to(userSocket[req.body.sender_id]).emit("friendRequest");

        res.json({
            data: "Request accepted!",
            error: null
        })

    } catch (error) {
        res.status(404).json({
            data: null,
            error: error
        })
    }

})

router.get('/getChat/:roomid', (req, res) => {

    const roomId = req.params.roomid;

    try {

        Chat.findOne({ room_id: roomId })
            .then(msgs => {

                if (msgs) {

                    res.json({
                        data: msgs,
                        error: null
                    })
                } else {

                    const newChat = new Chat({
                        room_id: roomId,
                        messages: []
                    })

                    newChat.save().then(() => {

                        res.json({
                            data: null,
                            error: null
                        })
                    })


                }

            })

    } catch (error) {

        res.status(500).json({
            data: null,
            error: 'Internal server error~'
        })
    }

})


router.get('/allchats/:id', async (req, res) => {
    const id = req.params.id;
console.log(id)
    try {
        const user = await User.aggregate([
            { $match: { _id: new ObjectId(id) } },
            { $unwind: '$friendList' }, // Unwind friendList array
            { $match: { 'friendList.hasChated': true } }, // Match only hasChated:true documents
            {
                $group: {
                  _id: '$_id',
                  friendList: { $push: '$friendList' } // Push filtered documents back into an array
                }
            }
            
        ]).exec();

        res.json({
            error : null,
            data : user[0]?.friendList 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


export default router;