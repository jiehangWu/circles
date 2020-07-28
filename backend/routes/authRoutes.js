const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const bcrypt = require('bcrypt')

const UserController = require('../controller/UserController');
const PostController = require('../controller/PostController');
const SearchController = require('../controller/SearchController');

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
    const { registerName, password } = req.body;
    let user = null;

    const checkIfUserExists = async (registerName) => {
        user = await UserController.findUserByRegisterName(registerName);
        if (user !== null) {
            return user.registerName === registerName;
        }
        return false;
    };

    (async (registerName) => {
        if (await (checkIfUserExists(registerName))) {
            logger.info("duplicate username")
            res.status(400).send("duplicate username");
        } else {
            const encryptedPassword = bcrypt.hashSync(password, 10);
            user = await UserController.createUser(registerName, encryptedPassword);

            const id = user._id;
            const tags = user.tags;

            await SearchController.addUserToCluster(id, tags);
            if (user !== null) {
                res.status(200).send("succesful register");
            } else {
                res.status(404).send("error in register");
            }
        }
    })(registerName)
});

router.post('/login', async (req, res, next) => {
    const { registerName, password } = req.body;
    let user = null;

    const validate = async () => {
        user = await UserController.findUserByRegisterName(registerName);
        if (user !== null) {
            // return user.registerName === registerName && user.password === password;
            return bcrypt.compareSync(password, user.password);
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
    console.log(userId);
    const result = await UserController.findUserByUserId(userId);
    if (result) {
        const username = result.username;
        const registerName = result.registerName;
        const avatar = result.avatar;
        logger.info(`Display ${username}`);
        res.status(200).send({ registerName, username, userId, avatar });
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

router.put('/home/tag', async (req, res) => {
    // logger.info("putting" + req.body.id);
    const { id, tag } = req.body;
    let response;
    try {
        response = await UserController.addTag(id, tag);
        const tags = response.tags;
        await SearchController.updateUserTags(id, tags);
        const returnTag = tags[tags.length - 1];
        res.status(200).send({ returnTag });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    logger.info(userId);
    const result = await UserController.findUserByUserId(userId);
    if (result) {
        const username = result.username;
        const tags = result.tags;
        // const posts = await PostController.loadPostsByIds(result.posts);
        const avatar = result.avatar;

        const posts = result.posts;
        logger.info(`Display ${username}`);
        res.status(200).send({ username, userId, tags, posts, avatar });
    } else {
        logger.error(result);
        res.status(400).send("please login");
    }
});

router.get("/tags/:userId", async (req, res, next) => {
    // logger.info("getting all tags");
    const userId = req.params.userId;
    // logger.info(userId);
    const result = await UserController.findUserByUserId(userId);

    if (result) {
        const tags = result.tags;
        logger.info(`Display for tag ${tags}`);
        // res.status(200).send({tags});
        return (res.json(tags));
    } else {
        logger.error(result);
        res.status(400).send("please login");
    }
});

router.delete("/tags/:userId", (req, res, next) => {
    const tagContent = req.body.tagContent;
    const userId = req.params.userId;
    logger.info(`Deleting for tag ${tagContent}`);
    logger.info(`Deleting for tag ${userId}`);
    return UserController.deleteTag(userId, tagContent).then(() => {
        res.status(200).end();
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
});

router.put('/avatar', (req, res, next) => {
    const userId = req.session.userId;
    const { avatarLink } = req.body;
    logger.info("avatar user id is: ", userId);
    logger.info("avatar link is: ", avatarLink);
    return UserController.uploadAvatar(userId, avatarLink).then(() => {
        res.status(200).end();
    }).catch((err) => {
        res.status(500).end();
    });
    // try {
    //     await UserController.uploadAvatar(userId, avatarLink);
    //     res.status(200).end();
    // } catch (err) {
    //     logger.error(err);
    //     res.status(500).send(err.message);
    // }
});

module.exports = router;