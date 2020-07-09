const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const UserController = require('./UserController');

logger.level = 'debug';

const Chat = mongoose.model("chats");

module.exports = {

    addChatMessage: (content, date, userId) => {
        const chat = new Chat({
            content: content,
            date: date,
            user: userId
        });
        return chat.save().then(() => {
            return UserController.findUserByUserId(userId);
        }).then((doc) => {
            doc.chats.push(chat._id);
            return doc.save();
        }).then(() => {
            logger.info("chats info:  ", post);
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

    loadAllChats: () => {
        return Chat.find({}).then((docs) => {
            return Post.populate(docs, {path: 'user', select: 'username'});
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    }
};
