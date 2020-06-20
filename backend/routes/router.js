const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'debug';

const UserController = require('../controller/UserController');

const redirect = (req, res, next) => {
    if (req.session.cookie !== null && req.session.cookie !== undefined) {
        logger.info(req.session.userId);
        logger.info(req.session.cookie);
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
            logger.info("duplicate username")
            res.status(400).send("duplicate username");
        } else {
            user = UserController.createUser(username, password);
            if (user !== null) {
                req.session.userId = user._id;
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
        const valid = await validate();
        if (valid) {
            req.session.userId = user._id;
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
    if (req.body.logOut === true) {
        delete req.session.userId;
        logger.info("log out successful");
        res.status(200).send("log out succeeded");
    } else  {
        const userId = req.session.userId;
        const result = await UserController.findUserByUserId(userId);
        if (result !== null && result !== undefined) {
            const username = result.username;
            logger.info(`Display ${username}`);
            res.status(200).send({ username });
        } else {
            logger.error(result);
            res.status(400).send("The user is not logged in");
        }

    }

});




router.get('/', redirect, (req, res, next) => {
    // do nothing
});

module.exports = router;