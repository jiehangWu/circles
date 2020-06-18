const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
    },
    password: String
});

const User = mongoose.model('users', UserSchema);

module.exports = User;