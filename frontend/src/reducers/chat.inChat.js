export const inChat = (init = 0, action) => {
    if (action.type === 'CLICK_CONTACT') {
        return 1;
    }
    if (action.type === 'LEAVE_CHAT') {
        return 0;
    }
    return init;
};