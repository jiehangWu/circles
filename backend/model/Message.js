const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    date: Date,
    content: String
},{
    timestamps: {}
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;