const elasticsearch = require('elasticsearch');
const { reduce } = require('bluebird');
const logger = require('log4js').getLogger();

const client = new elasticsearch.Client({
    hosts: [`http://localhost:${process.env.PORT_ELASTICSEARCH}`]
});

const addUserToCluster = async (userId, tags) => {
    try {
        let res = await client.index({
            index: 'circles_users',
            type: 'users_list',
            body: {
                "userId": userId,
                "tags": tags
            }
        });
        logger.info(res);
    } catch (err) {
        logger.error(err);
        throw err;
    }
};


const updateUserTags = async (id, tags) => {
    try {
        const query = {
            index: 'circles_users',
            body: {
                query: {
                    match: {
                        userId: id
                    }
                }
            }
        };

        const searchResult = await client.search(query);
        logger.info(searchResult);
        const docId = searchResult.hits.hits[0]._id;
        logger.info(docId);
        let res = await client.update({
            index: 'circles_users',
            type: 'users_list',
            id: docId,
            body: {
                doc: {
                    "tags": tags
                }
            }
        });
        logger.info(res);
    } catch (err) {
        logger.error(err);
        throw err;
    }
}

const addPostToCluster = async (postId, tags, content) => {
    try {
        let res = await client.index({
            index: 'circles_posts',
            type: 'posts_list',
            body: {
                "postId": postId,
                "tags": tags,
                "content": content
            }
        });
        logger.info(res);
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

const searchPostByKeyword = async (keyword) => {
    const query = {
        index: 'circles_posts',
        type: 'posts_list',
        body: {
            query: {
                match: {
                    "content": {
                        query: keyword
                    }
                }
            }
        }
    };

    try {
        const response = await client.search(query);
        return response;
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

const recommendByUserTag = async (id, tag) => {
    const query = {
        index: 'circles_users',
        body: {
            _source: ["userId"],
            query: {
                match: {
                    "tags": tag
                }
            },
            suggest: {
                gotsuggest: {
                    text: tag,
                    term: {
                        field: 'tags'
                    }
                }
            }
        }
    };

    try {
        const response = await client.search(query);
        const result = response.hits.hits.map(item => item._source.userId)
                            .filter(item => item !== id)
                            .reduce((result, item) => {
                                if (!result.includes(item)) {
                                    result.push(item);
                                }   
                                return result;
                            }, []);
        return result;
    } catch (err) {
        logger.error(err);
        throw err;
    }
}

module.exports = {
    addPostToCluster,
    addUserToCluster,
    searchPostByKeyword,
    recommendByUserTag,
    updateUserTags
};