const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    avatar: String,
    emailAddress: String,
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        }
    ],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    liked_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
});

const User = mongoose.model('users', UserSchema);

module.exports = User;