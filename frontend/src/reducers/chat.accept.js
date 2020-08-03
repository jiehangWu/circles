export const chatAccept = (init = 1, action) => {
    if (action.type === 'CHAT_ACCEPT') {
        console.log(init);
        if (init === 1) {
            return 0;
        } return 1;
    }
    return init;
};