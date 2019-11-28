const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    pseudo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const user = mongoose.model('users', userSchema);

module.exports = user;