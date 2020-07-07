const getKey = (link) => {
    const start = "https://" + process.env.BUCKET_NAME + ".s3.amazonaws.com/"
    const pos = start.length;
    return link.slice(pos,);
}

const processTags = (tags) => {
    const result = tags.reduce((result, item) => {
        return result + JSON.stringify(item) + " ";
    }, "");
    return result;
}

module.exports = {
    getKey,
    processTags
};