const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema ({
    contact0: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    contact1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    c1HasRead: Boolean,
    c2HasRead: Boolean,
    updateDate: String,
    messages: [String]
});

const Chat = mongoose.model('chats', ChatSchema);

module.exports = Chat;