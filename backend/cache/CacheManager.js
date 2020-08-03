const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');

const redis_client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    { auth_pass: process.env.REDISCACHEKEY, tls: { servername: process.env.REDISCACHEHOSTNAME } });

const CACHE_EXPIRATION_TIME = 60 * 60;

const addToCache = (sessionId, userId) => {
    redis_client.setex(`${sessionId}`, CACHE_EXPIRATION_TIME, userId);
}

const getUserIdFromCache = (userId) => {
    let value;
    redis_client.get(`${userId}`, (err, data) => {
        if (err) {
            throw err;
        }
        value = data;
    });
    return value;
}

module.exports = {
    getUserIdFromCache,
    addToCache,
}