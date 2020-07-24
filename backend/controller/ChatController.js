const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const Chat = mongoose.model("chats");
const Message = mongoose.model("messages");

module.exports = {

    addChatMessage: (content, date, sender, receiver) => {
        const newMessage = new Message({
            sender: sender,
            content: content,
            date: date
        });
        const messageId = newMessage._id;
        return Chat.findOne({$or: [{chatter0: sender, chatter1: receiver},{chatter1: sender, chatter0: receiver}]}).
        then((doc)=> {
            if (doc === null) {
                const newChat = new Chat({
                    chatter0: sender,
                    chatter1: receiver,
                    c0HasRead: true,
                    c1HasRead: false,
                    messages:[]
                });
                return newChat.save();
            } else {
                if (doc.chatter0 === sender) {
                    doc.c0HasRead = true;
                    doc.c1HasRead = false;
                } else {
                    doc.c1HasRead = false;
                    doc.c0HasRead = true;
                }
                return doc.save();
            }
        }).then((doc)=> {
            doc.messages.push(messageId);
            return doc.save();
        }).then(()=> {
            return newMessage.save();
        }).then((doc)=> {
            return doc.populate({path:"sender", select: "username"}).execPopulate();
        }).then((messageDoc) => {
            return Promise.resolve(messageDoc);
        }).catch((err) => {
            logger.error(err);
            return Promise.reject(err);
        })
    },

    loadChats: (userId) => {
        return Chat.find({$or: [{chatter0: userId},{chatter1: userId}]}).then((docs) => {
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
        return Chat.findOne({$or: [{chatter0: setUserId, chatter1: userId2},{chatter0: userId2, chatter1: setUserId}]}).then((doc) => {
            if (doc !== undefined) {
                logger.info(doc);
                if (setUserId ===  Chat.populate(doc, {path:'chatter0'})) {
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
        });bv.toString()
    },
};
