const log4js = require('log4js');
const logger = log4js.getLogger();
const redis = require('redis');
const bluebird = require("bluebird");
const { generatesessionKey } = require('../utils/util');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    { auth_pass: process.env.REDISCACHEKEY, tls: { servername: process.env.REDISCACHEHOSTNAME } });

// const redisClient = redis.createClient();

// const CACHE_EXPIRATION_TIME = 60 * 60;

// const addToCache = async (sessionKey, userId) => {
//     console.log(`line16 ${sessionKey}`);
//     await redisClient.setexAsync(`${sessionKey}`, CACHE_EXPIRATION_TIME, `${userId}`);
// }

const getUserIdFromCache = async (sessionKey) => {
    const response =  await redisClient.getAsync(`${sessionKey}`);
    return JSON.parse(response)["userId"];
}

module.exports = {
    getUserIdFromCache,
    redisClient
}