const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const searchController = require('../controller/SearchController');

logger.level = 'debug';

/**
 * Search all the contents that have the corresponding keyword.
 */
router.get('/posts/:keyword', async (req, res) => {
    const keyword = req.params.keyword;
    let response;
    try {
        response = await searchController.searchPostByKeyword(keyword)
        logger.info(response);
        res.status(200).send(response);
    } catch (err) {
        logger.error(err);
        res.status(500).end();
    }
});

/**
 * This endpoint is for development only.
 * Recommend users based on input tags and user id.
 */
router.post('/', async (req, res) => {
    const { id, tag } = req.body;
    let response;
    try {
        response = await searchController.recommendByUserTag(id, tag);
        logger.info(response);
        res.status(200).send(response);
    } catch (err) {
        logger.error(err);
        res.status(500).end();
    }
});

module.exports = router;