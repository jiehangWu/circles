const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');

const redis_client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});

const CACHE_EXPIRATION_TIME = 15 * 60;

const checkPostCache = (req, res, next) => {
    const userId = req.session.userId;
    redis_client.get(`${userId}`, (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).send(err);
        }
        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    });
};

const addToCache = (userId, posts) => {
    redis_client.setex(`${userId}`, CACHE_EXPIRATION_TIME, JSON.stringify(posts));
}

const appendToKey = (userId, post) => {
    redis_client.get(`${userId}`, (err, reply) => {
        if (err) {
            throw err;
        }
        if (reply === null) {
            return;
        }
        const posts = JSON.parse(reply);
        posts.push(post);
        addToCache(userId, posts);
    });
}

const deleteFromCache = (userId, postId) => {
    redis_client.get(`${userId}`, (err, reply) => {
        if (err) {
            throw err;
        }
        if (reply === null) {
            return;
        }
        let posts = JSON.parse(reply);

        posts = posts.filter(post => post._id !== postId);
        addToCache(userId, posts);
    });
}

module.exports = {
    checkPostCache,
    addToCache,
    appendToKey,
    deleteFromCache
}