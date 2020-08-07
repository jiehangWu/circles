const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

const searchController = require('../controller/SearchController');
const userController = require('../controller/UserController');
const PostController = require('../controller/PostController');

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
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

router.post("/", (req, res) => {
    logger.info("posting");
    let { content, date, userId, tags, imgLink } = req.body;
    date = new Date(date);
    return PostController.addPost(content, date, userId, tags, imgLink).then(async (post) => {
        await searchController.addPostToCluster(post._id, tags, content);
        res.status(200).json(post);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.put("/l/:id", async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    logger.info("userId is" + userId);
    return PostController.likePost(userId, postId).then((numLikes) => {
        res.status(200).send(numLikes.toString());
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.delete("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const { userId } = req.body;
    return PostController.deletePost(userId, postId).then(async () => {
        await searchController.deletePostFromCluster(postId);
        res.status(200).end();
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    });
});

router.put("/c/:id", async (req, res) => {
    const postId = req.params.id;
    const { userId, content, date } = req.body;
    return PostController.addComment(content, new Date(date), userId, postId).then((comment) => {
        res.status(200).json(comment);
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
});

router.get('/profile/posts/:id', async (req, res) => {
    const userId = req.params.id;
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