const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'debug';

const User = mongoose.model("users");

module.exports = {
    findUserByUserId: (id) => {
        return User.findById(id);
    },

    createUser: (username, password) => {
        const user = new User({ username, password });
        return user.save();
    },

    findUserByUserName: (username) => {
        const query = {
            username: username
        };
        return User.findOne(query);  
    },

    addTag: async (id, tag) => {
        let user = await User.findById(id);
        user.tags.push(tag);
        return user.save();
    }
};