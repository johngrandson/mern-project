const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const gravatar = require('gravatar');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

module.exports.registerController = (req, res) => {
    try {
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validator
        if (!isValid)
            return res.status(400).json(errors);

        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.email = 'Email already exists';
                    return res.status(400).json(errors);
                } else {
                    const avatar = gravatar.url(req.body.email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });

                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        avatar,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    } catch (error) {
        throw error;
    }

}

module.exports.loginController = (req, res) => {
    try {
        const { errors, isValid } = validateLoginInput(req.body)

        // Check validator
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        // Find user by email
        User.findOne({ email })
            .then(user => {
                // Check for the user
                if (!user) {
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
                }

                // Check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors)
                        } else {
                            const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create jwt

                            // Sign token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 36000 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    })
                                })
                        }
                    })
            });
    } catch (error) {
        throw error;
    }
}

module.exports.currentController = (req, res) => {
    try {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    } catch (error) {
        throw error;
    }
}