const AWS = require('aws-sdk');
const uuid = require('uuid');
const logger = require('log4js').getLogger();
const fs = require('fs');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = async (file) => {
    const fileBuffer = Buffer.from(file);
    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(fileBuffer),
        Key: uuid.v4()
    }

    const result = await s3.upload(params).promise();
    if (result) {
        return result.Location;
    } else {
        // handle error
        logger.error(result);
    }
};

module.exports = { upload };