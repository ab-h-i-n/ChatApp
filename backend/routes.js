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
                            password: hash,
                            profilePhoto: req.body.profilePhoto,
                            createdAt: getTimeStamp()
                        });


                        newUser.save()
                            .then(user => {
                                res.json({
                                    data: {
                                        _id : user._id
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
                                    _id : user._id
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


router.post('/getuser', (req, res) => {

    User.findOne({ _id: req.body._id })
        .then(user => {
            if (user) {
                res.json({
                    data: {
                        name: user.name,
                        email: user.email,
                        profilePhoto: user.profilePhoto,
                        createdAt: user.createdAt
                    },
                    error : null
                })
            } else {
                res.status(404).json({
                    data : null,
                    error: "User does not exists!"
                })
            }
        })
        .catch(error => {
            res.status(404).json({
                data : null,
                error: "Failed to fetch user"
            })
        })

})



export default router;