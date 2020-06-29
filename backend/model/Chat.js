const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema ({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;