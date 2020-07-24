
export const addTag = (id, tag) => (dispatch) => {
  fetch('http://localhost:5000/home/tag', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id, tag }),

  }).then((response) => {
    // console.log("returend tags!!!!!!!!!!!!!" + response);
    if (response.ok) {
      // console.log(response.tags);
      return response.json();
    }
    throw new Error('error when adding tags');
  }).then((tag) => {
    // console.log("returend tags!!!!!!!!!!!!!" + tag);
    console.log(tag);
    dispatch(addTagSuccess(tag.returnTag));
  }).catch((err) => {
    console.log(err);
  });
};

export const addTagSuccess = (tagContext) => ({
  type: 'ADD_TAG',
  tag: tagContext,
});

export const loadAllTags = (userId) => {
  // console.log(userId);
  return dispatch => {
    fetch('http://localhost:5000/tags/' + userId, {
      // method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('error when fetching all tags');
      }
    }).then((tags) => {
      // console.log("tags json    :" + tags);
      dispatch({
        type: "INIT_TAGS",
        payload: tags
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export const deleteTag = (userId, tagContent) => {
  return dispatch => {
    fetch('http://localhost:5000/tags/' + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ tagContent }),
    }).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('error when deleting post ' + tagContent);
      }
    }).then(() => {
      dispatch({
        type: "DELETE_TAG",
        tag: tagContent
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

// export const deleteTag = (tag) => ({
//   type: 'DELETE_TAG',
//   tag: tag,
// });

export const initTags = (tags) => {
  return {
    type: 'INIT_TAGS',
    payload: tags,
  }
}
