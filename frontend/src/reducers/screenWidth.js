export const screenWidth = (init = 1000, action) => {
    if (action.type === 'SET_WIDTH') {
        return action.payload;
    }
    return init;
};