const mongoose = require('mongoose');

const User = mongoose.model("users");

module.exports = {
    findUserByUserId: (id) => {
        return User.findById(id)
            .catch((err) => {
                // TODO: handle error
            });
    },

    createUser: (username, password) => {
        const user = new User({ username, password });
        user.save(err => {
            // TODO: handle error
            if (err !== null) {
                console.log(err);
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
}