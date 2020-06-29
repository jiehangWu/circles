const express = require('express');
const router = express.Router();
const logger = require('log4js').getLogger();

logger.level = 'debug';

const awsController = require('../controller/AwsController');

router.post('/upload', async (req, res) => {
    const file = req.body;
    const link = await awsController.upload(file);
    if (link === null || link === undefined) {
        res.status(500).send('uploading to aws failed');
    } else {
        res.status(201).send(link);
    }
});

module.exports = router;