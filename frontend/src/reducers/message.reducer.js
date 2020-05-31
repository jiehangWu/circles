export const message = (state = {}, action) => {
    switch (action.type) {
        case "FAILED_MESSAGE":
            return {
                type: "alert-danger",
                message: action.payload,
            };
        case "SUCCESS_MESSAGE":
            return {
                type: "alert-success",
                message: action.payload,
            };
        case "CLEAR_MESSAGE":
            return {};
        default:
            return state;
    }
};