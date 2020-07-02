const getKey = (link) => {
    const start = "https://" + process.env.BUCKET_NAME + ".s3.amazonaws.com/"
    const pos = start.length;
    return link.slice(pos,);
}

module.exports = {
    getKey,
};