const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

const UserController = require('../controller/UserController');

router.put('/home', async (req, res) => {
     const { lat, lng, userId } = req.body;
     let response;
     try {
          response = UserController.setGeolocation(userId, lat, lng);
          res.status(200);
     } catch (err) {
          res.status(500).send(err);
     }
});

router.get('/circleslist/:userId', async (req, res) => {
     const userId = req.params.userId;
     try {
          const users = await UserController.findNearbyUsers(userId);
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