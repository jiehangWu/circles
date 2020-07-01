const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const UserController = require('./UserController');

logger.level = 'debug';

const Post = mongoose.model("posts");

module.exports = {
    // tags is an array of tag Id
    // resolve with the post document
    addPost: (content, date, userId, tags) => {
        const post = new Post({
            content: content,
            date: date,
            user: userId,
            tags: tags
        });
        return post.save().then(() => {
            return UserController.findUserByUserId(userId);
        }).then((doc) => {
            doc.posts.push(post._id);
            return doc.save();
        }).then(() => {
            logger.info("post is ", post);
            return post.populate({path: 'user', select: 'username'}).execPopulate();
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
        return Post.deleteOne({_id: postId}).then(() => {
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
        return Post.find({}).then((docs) => {
            return Post.populate(docs, {path: 'user', select: 'username'});
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    }
};
