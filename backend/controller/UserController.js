const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();
const util = require("../utils/util");

const User = mongoose.model("users");

module.exports = {
    findUserByUserId: (id) => {
        return User.findById(id);
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
};