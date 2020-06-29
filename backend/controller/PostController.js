const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const UserController = require('UserController');

logger.level = 'debug';

const Post = mongoose.model("posts");

module.exports = {
    // tags is an array of tag id
    addPost: (content, date, userID, tags) => {
        let postID;
        const post = new Post({
            content: content,
            date: date,
            user: userID,
            tags: tags
        });
        post.save().then(() => {
            Post.findOne({user: userID});
        }).then((doc) => {
            postID = doc._id;
            UserController.findUserByUserId(userID);
        }).then((doc) => {
            doc.posts.push(postID);
            doc.save();
        }).then(() => {
            logger.info("success!");
            return Promise.resolve(post);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    },

    likePost: (userID, postID) => {
        Post.findById(postID).then((doc) => {
            doc.likes += 1;
            doc.save();
        }).then(() => {
            UserController.findUserByUserId(userID)
        }).then((doc) => {
            doc.liked_posts.push(postID);
            doc.save();
        }).then(() => {
            logger.info("like post success");
            return Promise.resolve();
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    },

    deletePost: (userID, postID) => {
        Post.deleteOne({_id: postID}).then(() => {
            UserController.findUserByUserId(userID);
        }).then((doc) => {
            const index = doc.posts.indexOf(postID);
            if (index < -1) {
                throw new Error("post is already deleted");
            }
            doc.posts.splice(index, 1);
            doc.save();
        }).then(() => {
            logger.info("delete success");
            return Promise.resolve();
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    }
};
