const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');

logger.level = 'debug';

const PostController = require('../controller/PostController');

// const checkPostCache = (req, res, next) => {
//   redis_client.get("posts", (err, data) => {
//     if (err) {
//         logger.error(err);
//         res.status(500).send(err);
//     }
//     if (data != null) {
//         res.send(data);
//     } else {
//         next();
//     }
//   });
// };

// Create Redis client
// const redis_client = redis.createClient(process.env.PORT_REDIS);

// With Cache
// router.get("/", checkPostCache, (req, res, next) => {
//     logger.info("getting");
//     return PostController.loadAllPosts().then((posts) => {
//         logger.info(posts);
//         redis_client.setex("posts", 3600, JSON.stringify(posts));
//         res.status(200).json(posts);
//     }).catch((err) => {
//         logger.error(err);
//         res.status(500).end();
//     });
// });

// Without Cache
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
    let { content, date, userId, tags, imgLink } = req.body;
    logger.info(date);
    logger.info(typeof date);
    date = new Date(date);
    logger.info(date);
    logger.info(typeof date);
    return PostController.addPost(content, date, userId, tags, imgLink).then((post) => {
        res.status(200).json(post);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.put("/l/:id", (req, res, next) => {
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

router.put("/c/:id", (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.userId;
    const { content, date } = req.body;
    return PostController.addComment(content, new Date(date), userId, postId).then((comment) => {
        res.status(200).json(comment);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
})

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