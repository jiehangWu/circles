const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();
const bcrypt = require('bcrypt')

const UserController = require('../controller/UserController');
const SearchController = require('../controller/SearchController');

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    const { registerName, password } = req.body;
    let user = null;

    const validate = async () => {
        user = await UserController.findUserByRegisterName(registerName);
        if (user !== null) {
            return bcrypt.compareSync(password, user.password);
        }
        return false;
    };

    (async () => {
        if (await validate()) {
            res.status(200).json(user);
        } else {
            logger.info("login failed");
            res.status(400).send("login failed");
            next();
        }
    })();
});

router.put('/home/tag', async (req, res) => {
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
        const avatar = result.avatar;

        const posts = result.posts;
        logger.info(`Display ${username}`);
        res.status(200).send({ username, userId, tags, posts, avatar });
    } else {
        logger.error(result);
        res.status(400).send("please login");
    }
});

router.get("/tags/:userId", async (req, res) => {
    const userId = req.params.userId;
    const result = await UserController.findUserByUserId(userId);

    if (result) {
        const tags = result.tags;
        logger.info(`Display for tag ${tags}`);
        return (res.json(tags));
    } else {
        logger.error(result);
        res.status(400).send("please login");
    }
});

router.delete("/tags/:userId", (req, res) => {
    const tagContent = req.body.tagContent;
    const userId = req.params.userId;
    return UserController.deleteTag(userId, tagContent).then(async (user) => {
        const tags = user.tags;
        await SearchController.updateUserTags(userId, tags);
        res.status(200).end();
    }).catch((err) => {
        logger.error(err);
        res.status(500).end();
    })
});

router.put('/avatar', async (req, res) => {
    const { avatarLink, userId } = req.body;
    return UserController.uploadAvatar(userId, avatarLink).then(() => {
        res.status(200).end();
    }).catch((err) => {
        res.status(500).end();
    });
});

router.put('/firsttimer', async (req, res) => {
    const { userId } = req.body;
    return await UserController.cancelFirstTimeUser(userId).then(() => {
        res.status(200).send("false");
    }).catch((err) => {
        res.status(500).end();
    });
});

module.exports = router;