export const inChat = (init = 0, action) => {
    if (action.type === 'CLICK_CONTACT') {
        console.log(init);
        return 1;
    }
    if (action.type === 'LEAVE_CHAT') {
        console.log(init);
        return 0;
    }
    return init;
};