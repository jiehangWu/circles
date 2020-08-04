const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level="OFF";
const ChatController = require('../controller/ChatController');
const UserController = require('../controller/UserController');

router.get("/", async (req, res, next) => {
    const sessionKey = `sess:${req.session.id}`;
    const userId = req.session.userId || await CacheManager.getUserIdFromCache(sessionKey);
    logger.info("get chats by " + userId);
    const result = await UserController.findUserByUserId(userId);
    if (result) {
        const chats = await ChatController.loadChats(userId);
        logger.info(chats);
        res.status(200).send({
            chats,
            userId
        });
    } else {
        logger.error(result);
        res.status(400).send("error fetching chats for " + userId);
    }
});

module.exports = router;