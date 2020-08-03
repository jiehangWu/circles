const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');
const bluebird = require("bluebird");
const { generateSessionId } = require('../utils/util');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    { auth_pass: process.env.REDISCACHEKEY, tls: { servername: process.env.REDISCACHEHOSTNAME } });

const CACHE_EXPIRATION_TIME = 60 * 60;

const addToCache = async (sessionId, userId) => {
    console.log(`line16 ${sessionId}`);
    await redisClient.setexAsync(`${sessionId}`, CACHE_EXPIRATION_TIME, `${userId}`);
}

const getUserIdFromCache = async (sessionId) => {
    console.log(`line21: ${sessionId}`)
    const response =  await redisClient.getAsync(sessionId);
    return response;
}

module.exports = {
    getUserIdFromCache,
    addToCache,
}