const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const ObjectId = require('mongodb').ObjectID;
// logger.level = 'debug';


const Chat = mongoose.model("chats");
const Message = mongoose.model("messages");
const User = mongoose.model("users");

module.exports = {

    addChatMessage: (content, date, sender, receiver) => {
        const newMessage = new Message({
            sender: ObjectId(sender),
            content: content,
            date: date
        });
        const messageId = newMessage._id;
        return Chat.findOne({$or: [{chatter0: ObjectId(sender), chatter1: ObjectId(receiver)},
                {chatter1: ObjectId(sender), chatter0: ObjectId(receiver)}]}).
        then((doc)=> {
            if (doc === null) {
                const newChat = new Chat({
                    chatter0: ObjectId(sender),
                    chatter1: ObjectId(receiver),
                    c0Unread: 0,
                    c1Unread: 1,
                    messages:[]
                });
                return newChat.save();
            } else {
                if (doc.chatter0.toString() === sender) {
                    doc.c0Unread = 0;
                    doc.c1Unread = doc.c1Unread + 1;
                } else {
                    doc.c0Unread = doc.c0Unread + 1;
                    doc.c1Unread = 0;
                }
                return doc.save();
            }
        }).then((doc)=> {
            doc.messages.push(messageId);
            return doc.save();
        }).then(()=> {
            return newMessage.save();
        }).then((doc)=> {
            return Promise.resolve(doc);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    },


    loadChats: (userId) => {
        return Chat.find({$or: [{chatter0: ObjectId(userId)},{chatter1: ObjectId(userId)}]}).then((docs) => {
            return Chat.populate(docs, {path: "chatter0", select: ["username","avatar"]});
        }).then((docs)=> {
            return Chat.populate(docs, {path: "chatter1", select: ["username","avatar"]});
        }).then((docs) => {
            return Chat.populate(docs, {path: "messages", populate:{ path: "sender", select: "username"}});
        }).then((docs) => {
            return Promise.resolve(docs);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        });
    },

    // one has read it or not indicating by bool
    setChatStatus: (setUserId, userId2, hasRead) => {
        return Chat.findOne({$or: [{chatter0: ObjectId(setUserId), chatter1: ObjectId(userId2)},
                {chatter0: ObjectId(userId2), chatter1: ObjectId(setUserId)}]}).then((doc) => {
            if (doc !== null) {
                logger.info(doc);
                if (setUserId === doc.chatter0.toString()) {
                    if (hasRead) {
                        doc.c0Unread = 0;
                    } else {
                        doc.c0Unread = doc.c0Unread + 1;
                    }
                } else {
                    if (hasRead) {
                        doc.c1Unread = 0;
                    } else {
                        doc.c1Unread = doc.c1Unread + 1;
                    }
                }
                return doc.save();
            }
        }).then((doc) => {
            return Promise.resolve(doc);
        }).catch((err) => {
            logger.error(err);
        });
    },
};
