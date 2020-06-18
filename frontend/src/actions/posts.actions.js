export const submitPost = (post) => {
    return {
        type: "SUBMIT_POST",
        payload: post,
    }
}

export const likePost = (postID) => {
    return {
        type: "LIKE_POST",
        payload: {
            "postID": postID
        }
    }
}