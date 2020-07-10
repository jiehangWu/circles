const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const UserController = require('./UserController');

logger.level = 'debug';

const Chat = mongoose.model("chats");
const Message = mongoose.model("messages");

module.exports = {

    addChatMessage: (content, date, userId, otherUserId) => {
        const newMessage = new Message({
            date: date,
            content: content
        })

        newMessage.save(); 
        
        //  need to put
        const messages = [newMessage];
        const users = [userId, otherUserId];

        const chat = new Chat({
            users: users,
            messages: messages
        });

        return chat.save().then(() => {
            return UserController.findUserByUserId(userId);
        }).then((doc) => {
            doc.chats.push(chat._id);
            return doc.save();
        }).then(() => {
            logger.info("chats info:  ", chat);
            return chat.populate({path: 'user', select: 'username'}).execPopulate();
        }).then((doc) => {
            logger.info(doc);
            logger.info("success!");
            return Promise.resolve(doc);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    },

    continueChat: (content, date, userId, otherUserId) => {
        const newMessage = new Message({
            date: date,
            content: content
        })

        newMessage.save(); 
        
        //  need to put
        const messages = [newMessage];
        const users = [userId, otherUserId];

        const chat = new Chat({
            users: users,
            messages: messages
        });

        return chat.save().then(() => {
            return UserController.findUserByUserId(userId);
        }).then((doc) => {
            doc.chats.push(chat._id);
            return doc.save();
        }).then(() => {
            logger.info("chats info:  ", chat);
            return chat.populate({path: 'user', select: 'username'}).execPopulate();
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
            return Chat.populate(docs, {path: 'user', select: 'username'});
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    }
};
