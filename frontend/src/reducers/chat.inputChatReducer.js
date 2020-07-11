// might be not useful
export const chatInputChatReducer =  (init = "", action) => {
    if (action.type === "INPUT_CHAT") {
        return action.payload;
    }
    return init;
};

