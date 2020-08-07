const inputReducer = (init = '', action) => {
  if (action.type === 'INPUT_TAG') {
    return action.input;
  }
  if (action.type === 'ADD_IMAGE_POST') {
    const address = action.payload;
    return address;
  }
  return init;
};

export default inputReducer;
