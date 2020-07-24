const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: String,
    date: Date,
    imgLink: {
        type: String,
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    tags: [{
        type: String
        // ref: 'tags',
    }],
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
    }],
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;