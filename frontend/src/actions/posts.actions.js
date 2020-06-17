export const submitPost = (post) => {
    return {
        type: "SUBMIT_POST",
        payload: post,
    }
}