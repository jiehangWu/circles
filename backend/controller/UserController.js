const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const util = require("../utils/util");

const User = mongoose.model("users");

function getRad(d) {
    const pi = Math.PI;
    const rad = d*pi/180.0;
    return rad;
}


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
            tags: ["Sports", "Cars", "SportsCars"]
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
        let user = await User.findById(userId);
        console.log(user);
        logger.info(user);
        if (user.avatar) {
            await AwsController.deleteObj(util.getKey(user.avatar));
        }
        user.avatar = avatarLink;
        return user.save();
    },

    addTag: async (id, tag) => {
        let user = await User.findById(id);
        user.tags.push(tag);
        return user.save();
    },

    deleteTag: async (userId, tagContent) => {
        const user = await User.findById(userId);
        let updatedTags = [];
        user.tags.forEach(tag => {
            if (tag !== tagContent) {
                updatedTags.push(tag);
            }
            user.tags = updatedTags;
            user.save();
            return
        });
    },

    setGeolocation: async (id, lat, lng) => {
        let user = await User.findById(id);
        if (user.geolocation[0]) {
            user.geolocation[0] = lat;
            user.geolocation[1] = lng;
        } else {
            user.geolocation.push(lat);
            user.geolocation.push(lng);
        }
        user.save();
        return user;
    },

    findNearbyUsers: async () => {
        // not finished, trying to use ES's geo_distance
        // right now just returning all users
        let users = await User.find({});
        return users;
    },
};