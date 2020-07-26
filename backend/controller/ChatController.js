const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const ObjectId = require('mongodb').ObjectID;
//logger.level = 'OFF';
logger.level = 'debug';

const Chat = mongoose.model("chats");
const Message = mongoose.model("messages");

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
                    c0HasRead: true,
                    c1HasRead: false,
                    messages:[]
                });
                return newChat.save();
            } else {
                if (doc.chatter0.toString() === sender) {
                    doc.c0HasRead = true;
                    doc.c1HasRead = false;
                } else {
                    doc.c0HasRead = false;
                    doc.c1HasRead = true;
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
        }).then((messageDoc) => {
            return Promise.resolve(messageDoc);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    },

    loadChats: (userId) => {
        return Chat.find({$or: [{chatter0: ObjectId(userId)},{chatter1: ObjectId(userId)}]}).then((docs) => {
            return Chat.populate(docs, {path: "chatter0", select: "username"});
        }).then((docs)=> {
            return Chat.populate(docs, {path: "chatter1", select: "username"});
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
    setChatStatus: (setUserId, userId2, bool) => {
        return Chat.findOne({$or: [{chatter0: ObjectId(setUserId), chatter1: ObjectId(userId2)},
                {chatter0: ObjectId(userId2), chatter1: ObjectId(setUserId)}]}).then((doc) => {
            if (doc !== undefined) {
                logger.info(doc);
                if (setUserId===  doc.chatter0.toString()) {
                    doc.c0HasRead = bool;
                } else {
                    doc.c1HasRead = bool;
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
