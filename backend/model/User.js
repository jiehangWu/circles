const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    registerName: {
        type: String,
        unique: true,
        required: true
    },
    username: String,
    password: String,
    firstTimer: Boolean,
    avatar: {
        type: String,
        default: '',
    },
    emailAddress: String,
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chats',
        }
    ],
    unReadContacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    tags: [{
        type: String
        // ref: 'tags',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    liked_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    geolocation: [{
        type: String
    }],
    circleMessagesUnread: {
        type: Number,
        default: 0
    },
    circleMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }]

});

const User = mongoose.model('users', UserSchema);

module.exports = User;