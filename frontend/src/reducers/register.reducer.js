export const register = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return {
                registering: true,
            };
        case "REGISTER_SUCCESS":
            return {};
        case "REGISTER_FAIL":
            return {};
        default:
            return state;
    }
};