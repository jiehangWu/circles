export const chatVideoStatus = (init = 0, action) => {
    if (action.type === 'WAIT_VIDEO') {
        return 1;
    }
    if (action.type === 'HANG_VIDEO') {
        return 2;
    }
    if (action.type === 'CONNECT_VIDEO') {
        return 3;
    }
    if (action.type === 'CHAT_VIDEO') {
        return 4;
    }
    if (action.type === 'REFUSE_VIDEO') {
        return 5;
    }
    if (action.type === 'END_VIDEO') {
        return 0;
    }
    return init;
};
