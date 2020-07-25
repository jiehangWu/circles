const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const UserController = require('./UserController');
const AwsController = require('./AwsController');
const util = require("../utils/util");

logger.level = 'OFF';

const Post = mongoose.model("posts");
const Comment = mongoose.model("comments");

module.exports = {
    addComment: (content, date, userId, postId) => {
        const comment = new Comment({
            content: content,
            date: date,
            user: userId,
            post: postId,
        });
        const commentId = comment._id;
        return Post.findById(postId).then((doc) => {
            doc.comments.push(commentId);
            return doc.save();
        }).then(() => {
            return comment.save();
        }).then((comment) => {
            logger.info("comment is ", comment);
            return comment.populate({ path: 'user', select: 'username' }).execPopulate();
        }).then((comment) => {
            return Promise.resolve(comment);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    },


    // tags is an array of tag Id
    // resolve with the post document
    addPost: (content, date, userId, tags, imgLink) => {
        const post = new Post({
            content: content,
            date: date,
            user: userId,
            tags: tags,
            imgLink: imgLink,
        });
        return post.save().then(() => {
            return UserController.findUserByUserId(userId);
        }).then((doc) => {
            
            doc.posts.push(post._id);
            return doc.save();
        }).then(() => {
            logger.info("post is ", post);
            return post.populate({ path: 'user', select: 'username' }).execPopulate();
        }).then((doc) => {
            logger.info(doc);
            logger.info("success!");
            return Promise.resolve(doc);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    },

    // resolve with the number of likes after update
    likePost: (userId, postId) => {
        let isLiked;
        logger.info("userId is " + userId);
        logger.info("postId is " + postId);
        return UserController.findUserByUserId(userId).then((doc) => {
            if (doc.liked_posts.includes(postId)) {
                isLiked = true;
                const index = doc.liked_posts.indexOf(postId);
                if (index < 0) {
                    throw new Error("post is already deleted");
                }
                doc.liked_posts.splice(index, 1);
            } else {
                isLiked = false;
                doc.liked_posts.push(postId);
            }
            return doc.save();
        }).then(() => {
            return Post.findById(postId);
        }).then((doc) => {
            doc.likes += (isLiked ? -1 : 1);
            return doc.save();
        }).then((doc) => {
            logger.info("like post success");
            return Promise.resolve(doc.likes);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    },

    deletePost: (userId, postId) => {
        let commentList;
        return Post.findOne({_id: postId}).then((doc) => {
            commentList = doc.comments;
            if (doc.imgLink) {
                return AwsController.deleteObj(util.getKey(doc.imgLink));
            } else {
                return Promise.resolve();
            }
        }).then(() => {
            return Comment.deleteMany({_id: {$in : commentList}});
        }).then(() => {
            return Post.deleteOne({_id: postId})
        }).then(() => {
            return UserController.findUserByUserId(userId);
        }).then((doc) => {
            const index = doc.posts.indexOf(postId);
            if (index < -1) {
                throw new Error("post is already deleted");
            }
            doc.posts.splice(index, 1);
            return doc.save();
        }).then(() => {
            logger.info("delete success");
            return Promise.resolve();
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    },

    loadAllPosts: () => {
        return Post.find({}).sort({ date: -1 }).then((docs) => {
            return Post.populate(docs,
                [{ path: 'user', select: 'username' },
                { path: 'comments', populate: { path: 'user', select: 'username' } }]);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    },

    loadPostsByIds: async (ids) => {
        try {
            let docs = await Post.find({ "_id": { "$in": ids } });
            return Post.populate(docs,
                [{ path: 'user', select: 'username' },
                { path: 'comments', populate: { path: 'user', select: 'username' } }]);
        } catch (err) {
            throw(err);
        }
    }
};
