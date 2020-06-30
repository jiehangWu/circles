export const login = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                loggingIn: true,
                username: action.payload,
            };
        case "LOGIN_SUCCESS":
            return {
                loggedIn: true,
                username: action.payload,
            };
        case "LOGIN_FAIL":
            return {};
        case "LOG_OUT":
            return {};
        default:
            return state;
    }
};