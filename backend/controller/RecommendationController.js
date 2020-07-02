const elasticsearch = require('elasticsearch');
const logger = require('log4js').getLogger();

const client = new elasticsearch.Client({
    hosts: [`http://localhost:${process.env.PORT_ELASTICSEARCH}`]
});

const addUserToCluster = async (userid, tags) => {
    try {
        let res = await client.index({
            index: 'circles',
            type: 'users_list',
            body: {
                userid,
                tags
            }
        });
        logger.info(res);
    } catch (err) {
        logger.error(err);
    }
};

const addPostToCluster = async (postId, tags) => {
    try {
        let res = await client.index({
            index: 'circles',
            type: 'posts_list',
            body: {
                "postId": postId,
                "tags": tags
            }
        });
        logger.info(res);
    } catch (err) {
        logger.error(err);
    }
};

// const searchPost = async (tag, req, res, next) => {
//     const query = {
//         "query": {
//             "match": {
//                 "tags": tag
//             }
//         },
//         "suggest": {
//             "suggestion": {
//                 "text": tag,
//                 "term": {
//                     "field": "tags"
//                 }
//             }
//         }
//     };

//     try {
//         let res = await client.search(query).promise();
//         res.status(200).send(res);
//     } catch (err) {
//         logger.error(err);
//         res.error(err);
//     }
// };

module.exports = {
    addPostToCluster,
    addUserToCluster,
    // searchPost
};