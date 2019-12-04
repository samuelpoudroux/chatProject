const validateRegisterInput = require('../../../../services/validation/register');
const validateLoginInput = require('../../../../services/validation/login');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../model/user');

const register = async (req, res, next) => {
    const { errors, isValid } = await validateRegisterInput(req.body);

    if(!isValid) {
        return res.json({errors});
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
}

const login = (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body, login);
    if(!isValid) {
        return res.json({errors});
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.json({errors});
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                pseudo: user.pseudo,
                                avatar: user.avatar,
                                isAdmin: user.isAdmin
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            errors.status = 4565 ;
                            return res.json({errors});
                        }
                    });
        });
}

const pass = () => {
    return passport.authenticate('jwt', { session: false }), (req, res, next) => {
        return res.json({
            id: req.user.id,
            pseudo: req.user.name,
            email: req.user.email
        });
    }
}

module.exports = {
    register, login, pass
}


