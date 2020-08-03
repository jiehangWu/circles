const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

// const {checkPostCache, addToCache, appendToKey, deleteFromCache } = require('../cache/CacheManager');
const searchController = require('../controller/SearchController');
const userController = require('../controller/UserController');
const { processTags } = require('../utils/util');

const PostController = require('../controller/PostController');

// With Cache
// router.get("/", checkPostCache, (req, res, next) => {
//     logger.info("getting");
//     return PostController.loadAllPosts().then((posts) => {
//         logger.info(posts);
//         // redis_client.setex("posts", 3600, JSON.stringify(posts));
//         res.status(200).json(posts);
//     }).catch((err) => {
//         logger.error(err);
//         res.status(500).end();
//     });
// });

// Without Cache
// router.get("/", async (req, res, next) => {
//     logger.info("getting");
//     const { tags } = req.body;
//     return PostController.loadAllPosts().then((posts) => {
//         logger.info(posts);
//         res.status(200).json(posts);
//     }).catch((err) => {
//         logger.error(err);
//         res.status(500).end();
//     });
// });

// With Recommend and Cache
// router.get("/", checkPostCache, async (req, res, next) => {
//     logger.info("getting");
//     const userId = req.session.userId;
//     const user = await userController.findUserByUserId(userId);
//     const tags = processTags(user.tags);
//     logger.info(tags);
//     const postIds = await searchController.searchPostByKeyword(tags);
//     logger.info(postIds);
//     return PostController.loadPostsByIds(postIds).then((posts) => {
//         logger.info(posts);
//         addToCache(userId, posts);
//         res.status(200).json(posts);
//     }).catch((err) => {
//         logger.error(err);
//         res.status(500).end();
//     });
// });

// With Recommend 
router.get("/", async (req, res) => {
    const userId = req.session.userId;
    const user = await userController.findUserByUserId(userId);
    let postIds;
    if (user.tags.length !== 0) {
        const tags = JSON.stringify(user.tags);
        postIds = await searchController.searchPostByKeyword(tags);
    } else {
        postIds = await PostController.getRandomPostIds(20);
    }
    return PostController.loadPostsByIds(postIds).then((posts) => {
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
    return PostController.addPost(content, date, userId, tags, imgLink).then(async (post) => {
        await searchController.addPostToCluster(post._id, tags, content);
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
    });
});

router.delete("/:postId", (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.session.userId;
    return PostController.deletePost(userId, postId).then(async () => {
        await searchController.deletePostFromCluster(postId);
        res.status(200).end();
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
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

// delete remains to be changed
router.delete("/:postId", (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.session.userId;
    return PostController.deletePost(userId, postId).then(async () => {
        await searchController.deletePostFromCluster(postId);
        res.status(200).end();
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
});

router.get('/profile/posts/:id', async (req, res) => {
    const userId = req.params.id;
    logger.info(userId);
    const result = await userController.findUserByUserId(userId);
    if (result) {
        const posts = await PostController.loadPostsByIds(result.posts);
        logger.info('this persons post: ', posts);
        res.status(200).send({ posts });
    } else {
        logger.error(result);
        res.status(400).send("error fetching posts for one user");
    }
});

module.exports = router;