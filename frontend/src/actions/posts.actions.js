const submitPost = (post) => {
    return dispatch => {
        fetch('http://localhost:5000/post/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(post)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('error when posting');
            }
        }).then((post) => {
            dispatch({
                type: "SUBMIT_POST",
                payload: post,
            });
            dispatch({
                type: "CLEAR_IMAGE"
            });
        }).catch((err) => {
            console.log(err);
        });
    };
};

const likePost = (postId) => {
    return dispatch => {
        fetch('http://localhost:5000/post/' + postId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("error when liking post");
            }
        }).then((likes) => {
            dispatch({
                type: "LIKE_POST",
                payload: {
                    "postId": postId,
                    "likes": parseInt(likes),
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    };
};

const loadAllPosts = () => {
    return dispatch => {
        fetch('http://localhost:5000/post/', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('error when fetching all posts');
            }
        }).then((posts) => {
            console.log(posts);
            dispatch({
                type: "LOAD_ALL",
                payload: posts
            });
        }).catch((err) => {
            console.log(err);
        });
    };
};

const deletePost = (postId) => {
    return dispatch => {
        fetch('http://localhost:5000/post/' + postId, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('error when deleting post ' + postId);
            }
        }).then(() => {
            dispatch({
                type: "DELETE_POST",
                payload: postId
            });
        }).catch((err) => {
            console.log(err);
        });
    };
};

const uploadImage = (data) => {
    return (dispatch) => {
        fetch("http://localhost:5000/aws/upload", {
            method: "POST",
            body: data
        }).then((response) => {
            return response.text();
        }).then((address) => {
            console.log(address);
            dispatch({
                type: "ADD_IMAGE",
                payload: address,
            });
        });
    };
};


export const PostActions = {
    submitPost,
    likePost,
    deletePost,
    loadAllPosts,
    uploadImage
};
