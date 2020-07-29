const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger();


const UserController = require('../controller/UserController');

router.put('/home', (req, res) => {
     const { lat, lng } = req.body;
     const userId = req.session.userId;
     let response;
     try {
          response = UserController.setGeolocation(userId, lat, lng);
          res.status(200).send({ id });
     } catch (err) {
          res.status(500).send("wront");
     }
});

router.get('/circleslist', async (req, res) => {
     const id = req.session.userId;
     if (id === null || id === undefined) {
          const error = new Error("The user is not logged in");
          res.status(500).send(error);
          throw error;
     }
     try {
          const users = await UserController.findNearbyUsers();
          res.status(200).send(users);
     } catch (err) {
          logger.error(err);
          res.status(500).send("err"+ err);
     }
});

module.exports = router;