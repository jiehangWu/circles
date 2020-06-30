const inputReducer =  (init = "", action) => {
    if (action.type === "INPUT_TAG") {
        return action.input;
    }
    if (action.type === "ADD_IMAGE_POST") {
        let address = action.payload;
        let newStr = (' '+init).slice(1);
        newStr = newStr + "\n"+ "[img]"+address+"[/img]";
        return newStr;
    }
    return init;
 };

export default inputReducer;