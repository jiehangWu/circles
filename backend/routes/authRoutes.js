const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'debug';

const UserController = require('../controller/UserController');

const redirect = (req, res, next) => {
    if (req.session.cookie) {
        // logger.info(req.session.userId);
        // logger.info(req.session.cookie);
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
        if (await (checkIfUserExists(username))) {
            logger.info("duplicate username")
            res.status(400).send("duplicate username");
        } else {
            user = UserController.createUser(username, password);
            if (user !== null) {
                res.status(200).send("succesful register");
            } else {
                res.status(404).send("error in register");
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
        if (await validate()) {
            req.session.userId = user._id;
            logger.info(req.session.userId);
            logger.info("login succesful");
            res.status(200).send("login successful");
        } else {
            logger.info("login failed");
            res.status(400).send("login failed");
            next();
        }
    })();
});

router.post('/home', async (req, res) => {
    const userId = req.session.userId;
    logger.info(userId);
    const result = await UserController.findUserByUserId(userId);
    if (result) {
        const username = result.username;
        logger.info(`Display ${username}`);
        res.status(200).send({ username, userId });
    } else {
        logger.error(result);
        res.status(400).send("please login");
    }
});

router.post('/logout', (req, res) => {
    if (req.session.userId !== null && req.session.userId !== undefined) {
        // maybe cookie needs to be deleted too?
        delete req.session.userId;
    }
    logger.warn(req.session.userId);
    if (req.session.userId === null || req.session.userId === undefined) {
        logger.info("log out successful");
        res.status(202).send("You have been successfully logged out");
    } else {
        res.status(404).send("Logout failed");
    }
});

// TODO: query all tags
router.post('/profile', async (req, res) => {
    const userId = req.session.userId;
    logger.info(userId);
    const result = await UserController.findUserByUserId(userId);
    if (result) {
        const username = result.username;
        logger.info(`Display ${username}`);
        res.status(200).send({ username, userId });
    } else {
        logger.error(result);
        res.status(400).send("please login");
    }
});

router.get('/', redirect, (req, res, next) => {
    // TODO: to be refactored
});

module.exports = router;