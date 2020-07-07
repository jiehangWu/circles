const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');

const redis_client = redis.createClient(process.env.PORT_REDIS);

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

module.exports = {
    checkPostCache,
    addToCache
}