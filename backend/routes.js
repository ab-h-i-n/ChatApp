import express from 'express';
import User from './UserSchema.js';
import getTimeStamp from './TimeStamp.js';
import bcrypt, { hash } from 'bcrypt'

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
                        onlineStatus: user.onlineStatus
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

    User.find({ _id: { $ne: currentUser } }, '_id name about profilePhoto onlineStatus')
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


export default router;