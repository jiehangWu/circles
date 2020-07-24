const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    chatter0: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    chatter1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    c0HasRead: Boolean,
    c1HasRead: Boolean,
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }]
});

const Chat = mongoose.model('chats', ChatSchema);

module.exports = Chat;