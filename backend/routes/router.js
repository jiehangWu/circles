const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');

const redirect = (req, res, next) => {
    if (req.session.cookie !== null && req.session.cookie !== undefined) {
        res.redirect('/home');
    } else if (!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
};

/**
 * Notice how checkIfUserExists and validation are actually similar.
 * It is better to refactor them into UserController or use database query 
 * directly to validation/checkIfExist.
 */

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    let user = null;

    const checkIfUserExists = async (username) => {
        user = await UserController.findUserByUserName(username);
        if (user !== null) {
            return user.username === username;
        }
        return false;
    };

    (async (username) => {
        const exists = await (checkIfUserExists(username));
        if (exists) {
            console.log("duplicate username");
        } else {
            user = UserController.createUser(username, password);
            if (user !== null) {
                // TODO: Change this depending on where to direct
                req.session.userId = user._id;
                // TODO: should redirect to login or home
                res.send("succesful register");
                
            } else {
                // TODO: handle error
                res.send("error in register");
            }
        }
    })(username)
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    let user = null;

    const validate = async () => {
        user = await UserController.findUserByUserName(username);
        if (user !== null) {
            return user.username === username && user.password === password;
        }
        return false;
    };

    // TODO: any better way to write this?
    (async () => {
        const valid = await validate();
        if (valid) {
            req.session.userId = user._id;
            console.log("login successful");
            res.redirect('/home');
        } else {
            console.log("failed to login");
            next();
        }
    })();
});

router.get('/', redirect, (req, res, next) => {
    // do nothing
});

module.exports = router;