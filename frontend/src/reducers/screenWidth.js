export const screenWidth = (init = 0, action) => {
    if (action.type === 'SET_WIDTH') {
        return action.payload;
    }
    return init;
};