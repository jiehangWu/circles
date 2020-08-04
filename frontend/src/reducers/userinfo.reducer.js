export const userinfo = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_HOME':
            return {
                userId: action.payload.userId,
                username: action.payload.username,
                usernameFirst: action.payload.username.slice(0, action.payload.username.indexOf('#')),
                usernameIdentifier: action.payload.username.slice(action.payload.username.indexOf('#')),
                registerName: action.payload.registerName,
                avatar: action.payload.avatar,
                firstTimer: action.payload.firstTimer,
            };
        case 'UPLOAD_AVATAR':
            return {
                ...state,
                avatar: action.payload
            };
        case "LOAD_PROFILE":
            return {
                ...state,
                profileUserId: action.payload.userId,
                profileUsername: action.payload.username,
                profileAvatar: action.payload.avatar,
                tags: action.payload.tags,
                profilePosts: action.payload.posts
            };
        case "UPDATE_GEOLOCATION":
            return {
                ...state,
                geolocation: action.payload
            };
        case "LOAD_GEOCIRCLES_LIST":
            return {
                ...state,
                geoCirlesList: action.payload
            };
        case "LOAD_GEOLOCATION":
            return {
                ...state,
                geolocation: action.payload.geolocation,
                geoUser: 'action.payload.username'
            };
        case "CANCEL_FIRST_TIMER":
            return {
                ...state,
                firstTimer: action.payload,
            };
        case "LOG_OUT":
            return {};
        default:
            return state;
    }
};
