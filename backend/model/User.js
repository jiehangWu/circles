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
            ref: 'chats',
        }
    ],
    unReadContacts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    liked_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
});

const User = mongoose.model('users', UserSchema);

module.exports = User;