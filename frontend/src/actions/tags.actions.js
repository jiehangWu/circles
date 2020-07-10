
export const addTag = (id, tag) => (dispatch) => {

  console.log(JSON.stringify({id ,tag}));
  // console.log(JSON.stringify(tag));
  fetch('http://localhost:5000/home/tag', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({id ,tag}),

  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('error when adding tags');
  }).then((tag) => { 
    dispatch(addTagSuccess(tag));
  }).catch((err) => {
    console.log(err);
  });
};

export const addTagSuccess = (tagContext) => ({
  type: 'ADD_TAG',
  tag: tagContext,
});

// delete one Tag with index i from Tag port
export const deleteTag = (i) => ({
  type: 'DELETE_TAG',
  index: i,
});

