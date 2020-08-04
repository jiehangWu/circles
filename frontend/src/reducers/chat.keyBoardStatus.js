export const mobileKeyboard = (init = 0, action) => {
    if (action.type === 'KEYBOARD_UP') {
        return 1;
    }
    if (action.type === 'KEYBOARD_DOWN') {
        console.log(init);
        return 0;
    }
    return init;
};