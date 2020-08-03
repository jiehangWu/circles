export const screenHeight = (init = 0, action) => {
    if (action.type === 'SET_HEIGHT') {
        return action.payload;
    }
    return init;
};