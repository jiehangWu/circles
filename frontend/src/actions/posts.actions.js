import { location } from '../helpers/util';

const submitPost = (post) => (dispatch) => {
    fetch('https://circles-ubc-api.azurewebsites.net/post/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(post),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('error when posting');
    }).then((post) => {
        dispatch({
            type: 'SUBMIT_POST',
            payload: post,
        });
        dispatch({
            type: 'CLEAR_IMAGE',
        });
    }).catch((err) => {
        console.error(err);
    });
};

const likePost = (userId, postId, from) => (dispatch) => {
    fetch(`https://circles-ubc-api.azurewebsites.net/post/l/${postId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('error when liking post');
    }).then((likes) => {
        dispatch({
            type: 'LIKE_POST',
            payload: {
                postId,
                likes: parseInt(likes),
            },
        });
        if (from === location.SEARCH) {
            dispatch({
                type: 'LIKE_SEARCH_POST',
                payload: {
                    postId,
                    likes: parseInt(likes),
                },
            });
        }
        if (from === location.PROFILE) {
            dispatch({
                type: 'LIKE_PROFILE_POST',
                payload: {
                    postId,
                    likes: parseInt(likes),
                },
            });
        }
    }).catch((err) => {
        console.error(err);
    });
};

const loadAllPosts = (userId) => (dispatch) => {
    fetch('https://circles-ubc-api.azurewebsites.net/post/' + userId, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('error when fetching all posts');
    }).then((posts) => {
        dispatch({
            type: 'LOAD_ALL',
            payload: posts,
        });
    }).catch((err) => {
        console.error(err);
    });
};

const deletePost = (userId, postId, from) => (dispatch) => {
    fetch(`https://circles-ubc-api.azurewebsites.net/post/${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error(`error when deleting post ${postId}`);
    }).then(() => {
        dispatch({
            type: 'DELETE_POST',
            payload: postId,
        });
        if (from === location.SEARCH) {
            dispatch({
                type: 'DELETE_SEARCH_POST',
                payload: postId,
            });
        }
        if (from === location.PROFILE) {
            dispatch({
                type: 'DELETE_PROFILE_POST',
                payload: postId,
            });
        }
    }).catch((err) => {
        console.error(err);
    });
};

const uploadImage = (data) => (dispatch) => {
    fetch('https://circles-ubc-api.azurewebsites.net/aws/upload', {
        method: 'POST',
        body: data,
    }).then((response) => response.text()).then((address) => {
        dispatch({
            type: 'ADD_IMAGE',
            payload: address,
        });
    }).catch((err) => {
        console.error(err);
    });
};

const loadCirclesList = (userId) => async (dispatch) => {
    try {
        let response = await fetch('https://circles-ubc-api.azurewebsites.net/search/circleslist' + '/' + userId, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            response = await response.text();
            response = JSON.parse(response);
            dispatch({
                type: 'LOAD_CIRCLES_LIST',
                payload: response
            })
        } else {
            throw new Error('Error fetching circles list');
        }
    } catch (err) {
        console.error(err);
    }
};

const submitComment = (comment, from) => (dispatch) => {
    fetch(`https://circles-ubc-api.azurewebsites.net/post/c/${comment.postId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: comment.userId,
            content: comment.content,
            date: comment.date,
        }),
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('error when commenting post');
    }).then((comment) => {
        dispatch({
            type: 'COMMENT_POST',
            payload: comment,
        });
        if (from === location.SEARCH) {
            dispatch({
                type: 'COMMENT_SEARCH_POST',
                payload: comment,
            });
        }
        if (from === location.PROFILE) {
            dispatch({
                type: 'COMMENT_PROFILE_POST',
                payload: comment,
            });
        }
    }).catch((err) => {
        console.error(err);
    });
};

const loadProfilePosts = (currId) => {
    return dispatch => {
        fetch('https://circles-ubc-api.azurewebsites.net/post/profile/posts/' + currId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("error in response");
        }).then((msg) => {
            let parsedMsg = JSON.parse(msg);
            dispatch({
                type: "LOAD_PROFILE_POSTS",
                payload: parsedMsg
            });
        }).catch((err) => {
            console.error(err);
        });
    };
};

export const PostActions = {
    submitPost,
    likePost,
    deletePost,
    loadAllPosts,
    uploadImage,
    submitComment,
    loadProfilePosts,
    loadCirclesList
};
