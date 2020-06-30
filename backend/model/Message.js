const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    date: String,
    content: String
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;