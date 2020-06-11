const inputReducer =  (init = "", action) => {
    if (action.type === "INPUT_TAG") {
        return action.input;
    }
    return init;
 };

  export default inputReducer;