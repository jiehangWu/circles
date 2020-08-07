export const screenHeight = (init = 1000, action) => {
    if (action.type === 'SET_HEIGHT') {
        return action.payload;
    }
    return init;
};