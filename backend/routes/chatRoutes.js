const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');

const ChatController = require('../controller/ChatController');

router.get("/", (req, res, next) => {
    logger.info("get all chats");
    return ChatController.loadAllChats().then((posts) => {
        logger.info(posts);
        res.status(200).json(posts);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.post("/", (req, res, next) => {
     logger.info("adding chat message");
     const { content, date, userId, otherUserId} = req.body;
     return ChatController.addChatMessage(content, date, userId, otherUserId).then((chat) => {
         res.status(200).json(chat);
     }).catch((err) => {
         logger.error(err);
         res.status(500).end();
     });
 });

 module.exports = router;