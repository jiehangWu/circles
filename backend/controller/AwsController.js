const AWS = require('aws-sdk');
const logger = require('log4js').getLogger();
const fs = require('fs');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = async (name, file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(file.path),
        Key: `${name}_${Date.now()}`
    }

    try {
        const result = await s3.upload(params).promise();
        logger.info(result);
        return result.Location;
    } catch(err) {
        // handle error
        logger.error(err);
    }
};

module.exports = { upload };