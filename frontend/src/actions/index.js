// add input as a Redux state
export const inputTag = (input) => ({
  type: 'INPUT_TAG',
  input,
});

// add one tag to display in Tag port
export const addTag = (s) => ({
  type: 'ADD_TAG',
  tag: s,
});

// delete one Tag with index i from Tag port
export const deleteTag = (i) => ({
  type: 'DELETE_TAG',
  index: i,
});

// Select one Tag with index i from Tag port
export const selectToggleTag = (i) => ({
  type: 'SELECT_TOGGLE_TAG',
  index: i,
});
