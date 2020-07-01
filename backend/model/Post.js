const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: String,
    date: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags',
    }],
    likes: {
        type: Number,
        default: 0,
    },
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;