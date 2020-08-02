const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const util = require("../utils/util");
const AwsController = require('./AwsController');

const User = mongoose.model("users");

module.exports = {
    findUserByUserId: (id) => {
        return User.findById(id);
    },

    findUsersByIds: (ids) => {
        return User.find({ _id: { $in: ids } });
    },

    createUser: (registerName, password) => {
        const username = util.getRandomName();
        const user = new User({
            registerName, username, password,
            tags: ["Sports", "Cars", "SportsCars"],
            firstTimer: true
        });
        return user.save();
    },

    findUserByRegisterName: (registerName) => {
        const query = {
            registerName: registerName
        };
        return User.findOne(query);
    },

    uploadAvatar: async (userId, avatarLink) => {
        try {
            let user = await User.findById(userId);
            if (user.avatar) {
                await AwsController.deleteObj(util.getKey(user.avatar));
            }
            user.avatar = avatarLink;
            return user.save();
        } catch (e) {
            logger.error(e.message);
        }
    },

    addTag: async (id, tag) => {
        try {
            let user = await User.findById(id);
            user.tags.push(tag);
            return user.save();
        } catch (e) {
            logger.error(e.message);
        }
    },

    deleteTag: async (userId, tagContent) => {
        try {
            const user = await User.findById(userId);
            user.tags = user.tags.filter(tag => tag !== tagContent);
            return user.save();
        } catch (e) {
            logger.error(e.message);
        }
    },

    setGeolocation: async (id, lat, lng) => {
        try {
            let user = await User.findById(id);
            if (user.geolocation[0]) {
                user.geolocation[0] = lat;
                user.geolocation[1] = lng;
            } else {
                user.geolocation.push(lat);
                user.geolocation.push(lng);
            }
            return user.save();
        } catch (e) {
            logger.error(e.message);
        }
    },

    findNearbyUsers: async (id) => {
        // To be optmized, ES's geo_distance next sprint
        try {
            let currUser = await User.findById(id);
            let users = await User.find({});
            let nearbyIds = util.getNearbyList(id, currUser.geolocation[0], currUser.geolocation[1], users);
            let ret = [];
            for (let nearby of nearbyIds) {
                let nearbyUser = await User.findById(nearby._id);
                let user = {
                    geoDistance: nearby.geoDistance,
                    username: nearbyUser.username,
                    _id: nearbyUser._id,
                    avatar: nearbyUser.avatar,
                };
                ret.push(user);
            }
            return ret;
        } catch (e) {
            logger.error(e.message);
        }
    },

    cancelFirstTimeUser: async (id) => {
        try {
            let user = await User.findById(id);
            user.firstTimer = false;
            return user.save();
        } catch (e) {
            logger.error(e.message);
        }
    },
};