const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

const UserController = require('../controller/UserController');

router.put('/home', async (req, res) => {
     const { lat, lng } = req.body;
     const sessionKey = `sess:${req.session.id}`;
     const userId = req.session.userId || await CacheManager.getUserIdFromCache(sessionKey);
     let response;
     try {
          response = UserController.setGeolocation(userId, lat, lng);
          res.status(200);
     } catch (err) {
          res.status(500).send(err);
     }
});

router.get('/circleslist', async (req, res) => {
     const sessionKey =  `sess:${req.session.id}`;
     const id = req.session.userId || await CacheManager.getUserIdFromCache(sessionKey);
     if (id === null || id === undefined) {
          const error = new Error("The user is not logged in");
          res.status(500).send(error);
          throw error;
     }
     try {
          const users = await UserController.findNearbyUsers(id);
          res.status(200).send(users);
     } catch (err) {
          logger.error(err);
          res.status(500).send(err);
     }
});

router.get('/:id', async (req, res) => {
     const id = req.params.id;
     try {
          const user = await UserController.findUserByUserId(id);
          res.status(200).send(user);
     } catch (err) {
          logger.error(err);
          res.status(500).send(err);
     }
});

module.exports = router;