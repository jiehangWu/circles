const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');

const ChatController = require('../controller/ChatController');
const UserController = require('../controller/UserController');

router.get("/", async (req, res, next) => {
    const userId = req.session.userId;
    logger.info("get chats by " + userId);
    const result = await UserController.findUserByUserId(userId);
    if (result) {
        const chats = await ChatController.loadChats(userId);
        logger.info(chats);
        res.status(200).send(chats);
    } else {
        logger.error(result);
        res.status(400).send("error fetching chats for " + userId);
    }
});

// should through socket
router.post("/", (req, res, next) => {
    logger.info("adding chat message");
    const { content, date, userId, otherUserId } = req.body;
    return ChatController.addChatMessage(content, date, userId, otherUserId).then((chat) => {
        res.status(200).json(chat);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

module.exports = router;