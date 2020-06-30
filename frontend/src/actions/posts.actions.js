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
    console.log("start fetching");
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
}

// TODO: Review this
const uploadImage = (data) => {
    return (dispatch) => {
        dispatch({
            type: "UPLOAD_IMAGE",
            payload: data
        });
        // data._boundary is undefined
        console.log(data._boundary);
        fetch("http://localhost:5000/aws/upload", {
            method: "POST",
            body: data
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                let address = data.address;
                console.log(address);
            }
        })
    }
};

export const PostActions = {
    submitPost,
    likePost,
    loadAllPosts,
    uploadImage
};
