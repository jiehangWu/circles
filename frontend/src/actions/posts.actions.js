const submitPost = (post) => (dispatch) => {
  fetch('https://circles-ubc-api.azurewebsites.net/post', {
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
  fetch(`https://circles-ubc-api.azurewebsites.net/post/l/${postId}`, {
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
  fetch('https://circles-ubc-api.azurewebsites.net/post', {
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
  fetch(`https://circles-ubc-api.azurewebsites.net/post/${postId}`, {
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
  fetch('https://circles-ubc-api.azurewebsites.net/aws/upload', {
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

const submitComment = (comment) => (dispatch) => {
  fetch(`https://circles-ubc-api.azurewebsites.net/post/c/${comment.postId}`, {
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

export const PostActions = {
  submitPost,
  likePost,
  deletePost,
  loadAllPosts,
  uploadImage,
  submitComment,
};
