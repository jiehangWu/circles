const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');

const redirect = ((req, res, next) => {
    if (req.cookie !== null) {
        res.redirect('/home');
    } else if (!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', redirect, (req, res, next) => {
    // do nothing
});

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
                console.log(req.session.userId);
                // TODO: should redirect to login or home
                res.send("succesful register");
                
            } else {
                // TODO: handle error
                res.send("error");
            }
        }
    })(username)
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    let user = null;

    const validation = async () => {
        user = await UserController.findUserByUserName(username);
        if (user !== null) {
            return user.username === username && user.password === password;
        }
        return false;
    };

    // TODO: any better way to write this?
    (async (username) => {
        const valid = await validation(username);
        if (valid) {
            req.session.userId = user._id;
            console.log(req.session.userId);
            console.log("login successful");
            res.redirect('/home');
        } else {
            console.log("failed");
            next();
        }
    })(username);
});

module.exports = router;