const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'debug';

const PostController = require('../controller/PostController');

router.get("/", (req, res, next) => {
    logger.info("getting");
    return PostController.loadAllPosts().then((posts) => {
        logger.info(posts);
        res.status(200).json(posts);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.post("/", (req, res, next) => {
    logger.info("posting");
    const { content, date, userId, tags } = req.body;
    return PostController.addPost(content, date, userId, tags).then((post) => {
        res.status(200).json(post);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.put("/:id", (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.userId;
    logger.info("userId is" + userId);
    return PostController.likePost(userId, postId).then((numLikes) => {
        res.status(200).send(numLikes.toString());
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
});

router.delete("/:postId", (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.session.userId;
    return PostController.deletePost(userId, postId).then(() => {
        res.status(200).end();
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
});

module.exports = router;