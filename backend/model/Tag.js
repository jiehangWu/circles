const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema ({
    content: String,
    color: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;