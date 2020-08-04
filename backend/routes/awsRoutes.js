const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const logger = require('log4js').getLogger();

const awsController = require('../controller/AwsController');

router.post('/upload', async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req);
    form.on('file', async (name, file) => {
        logger.info(file.path);
        logger.info(`uploading ${name}...`);
        try {
            const address = await awsController.upload(name, file);
            logger.info(`finished uplaoding ${name}`);
            res.status(201).send(address);
        } catch (err) {
            logger.error(err);
            res.status(500).end();
        }
    });
});

module.exports = router;