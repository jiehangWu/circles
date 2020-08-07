const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const searchController = require('../controller/SearchController');
const userController = require('../controller/UserController');
const PostController = require('../controller/PostController');

router.get('/circleslist/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userController.findUserByUserId(userId);
        const tags = JSON.stringify(user.tags);
        logger.info(tags);
        const response = await searchController.recommendByUserTag(userId, tags);
        logger.info(response);
        const users = await userController.findUsersByIds(response);
        logger.info(users);
        res.status(200).send(users);
    } catch (err) {
        logger.error(err);
        res.status(500).end();
    }
});

router.get("/:keyword", async (req, res) => {
    const keyword = req.params.keyword;
    const postIds = await searchController.searchPostByKeyword(keyword);
    return PostController.loadPostsByIds(postIds).then((posts) => {
        logger.info(posts);
        res.status(200).json(posts);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

module.exports = router;