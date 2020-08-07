export const chatVideoCaller = (init = 1, action) => {
    if (action.type === 'CALLER') {
        return 1;
    }
    if (action.type === 'CALLEE') {
        return 0;
    }
    return init;
};
