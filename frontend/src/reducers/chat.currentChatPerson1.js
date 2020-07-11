export const currentChatPerson =  (init = "cc", action) => {
    if (action.type === "CHAT_SWITCH") {
        console.log(action.payload);
        return action.payload;
    }
    return init;
};