const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'debug';

const User = mongoose.model("users");

module.exports = {
    findUserByUserId: (id) => {
        return User.findById(id)
            .catch((err) => {
                // TODO: handle error
                logger.error(err)
            });
    },

    createUser: (username, password) => {
        const user = new User({ username, password });
        user.save(err => {
            // TODO: handle error
            if (err !== null) {
                logger.error(err)
            }
        });
        return user;
    },

    findUserByUserName: (username) => {
        const query = {
            username: username
        };

        return User.findOne(query);  
    },
};