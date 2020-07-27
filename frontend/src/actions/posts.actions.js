const submitPost = (post) => (dispatch) => {
  fetch('http://localhost:5000/post/', {
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
    console.log(err);
  });
};

const likePost = (postId) => (dispatch) => {
  fetch(`http://localhost:5000/post/l/${postId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
  }).catch((err) => {
    console.log(err);
  });
};

const loadAllPosts = () => (dispatch) => {
  fetch('http://localhost:5000/post/', {
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
    console.log(posts);
    dispatch({
      type: 'LOAD_ALL',
      payload: posts,
    });
  }).catch((err) => {
    console.log(err);
  });
};

const deletePost = (postId) => (dispatch) => {
  fetch(`http://localhost:5000/post/${postId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
  }).catch((err) => {
    console.log(err);
  });
};

const uploadImage = (data) => (dispatch) => {
  fetch('http://localhost:5000/aws/upload', {
    method: 'POST',
    body: data,
  }).then((response) => response.text()).then((address) => {
    console.log(address);
    dispatch({
      type: 'ADD_IMAGE',
      payload: address,
    });
  });
};

const loadCirclesList = () => async (dispatch) => {
  try {
    let response = await fetch('http://localhost:5000/search/circleslist', {
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
    console.log(err.message);
  }
  
}

const submitComment = (comment) => (dispatch) => {
  fetch(`http://localhost:5000/post/c/${comment.postId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
  }).catch((err) => {
    console.log(err);
  });
};

const loadProfilePosts = (currId) => {
  return dispatch => {
    fetch('http://localhost:5000/post/profile/posts/' + currId, {
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
      // console.log(parsedMsg);
      dispatch({
        type: "LOAD_PROFILE_POSTS",
        payload: parsedMsg
      });
    }).catch((err) => {
      console.log("going back");
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
