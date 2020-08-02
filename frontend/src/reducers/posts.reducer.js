const initial = {
    uploadedImgLink: '',
    postList: [],
    circlesList: [],
    searchResult: [],
    profileList: [],
};

export const posts = (state = initial, action) => {
    switch (action.type) {
        case 'SUBMIT_POST':
            return {
                ...state,
                postList: [action.payload, ...state.postList],
            };
        case 'COMMENT_POST':
            return {
                ...state,
                postList: [
                    ...state.postList.map((post) => {
                        if (post._id === action.payload.post) {
                            return {
                                ...post,
                                comments: [...post.comments, action.payload],
                            };
                        }
                        return post;
                    }),
                ],
            };
        case 'COMMENT_SEARCH_POST':
            return {
                ...state,
                searchResult: [
                    ...state.searchResult.map((post) => {
                        if (post._id === action.payload.post) {
                            return {
                                ...post,
                                comments: [...post.comments, action.payload],
                            };
                        }
                        return post;
                    }),
                ],
            };
        case 'COMMENT_PROFILE_POST':
            return {
                ...state,
                profileList: [
                    ...state.profileList.map((post) => {
                        if (post._id === action.payload.post) {
                            return {
                                ...post,
                                comments: [...post.comments, action.payload],
                            };
                        }
                        return post;
                    }),
                ],
            };
        case 'LIKE_POST':
            return {
                ...state,
                postList: [
                    ...state.postList.map((post) => {
                        if (post._id === action.payload.postId) {
                            return {
                                ...post,
                                likes: action.payload.likes,
                            };
                        }
                        return post;
                    }),
                ],
            };
        case 'LIKE_SEARCH_POST':
            return {
                ...state,
                searchResult: [
                    ...state.searchResult.map((post) => {
                        if (post._id === action.payload.postId) {
                            return {
                                ...post,
                                likes: action.payload.likes,
                            };
                        }
                        return post;
                    }),
                ],
            };
        case 'LIKE_PROFILE_POST':
            return {
                ...state,
                profileList: [
                    ...state.profileList.map((post) => {
                        if (post._id === action.payload.postId) {
                            return {
                                ...post,
                                likes: action.payload.likes,
                            };
                        }
                        return post;
                    }),
                ],
            };
        case 'LOAD_ALL':
            return {
                ...state,
                postList: action.payload,
            };
        case 'LOAD_CIRCLES_LIST':
            return {
                ...state,
                circlesList: action.payload
            };
        case 'DELETE_POST':
            return {
                ...state,
                postList: state.postList.filter((post) => post._id !== action.payload),
            };
        case 'DELETE_SEARCH_POST':
            return {
                ...state,
                searchResult: state.searchResult.filter((post) => post._id !== action.payload),
            };
        case 'DELETE_PROFILE_POST':
            return {
                ...state,
                profileList: state.profileList.filter((post) => post._id !== action.payload),
            };
        case 'ADD_IMAGE':
            return {
                ...state,
                uploadedImgLink: action.payload,
            };
        case 'CLEAR_IMAGE':
            return {
                ...state,
                uploadedImgLink: '',
            };
        case 'LOAD_PROFILE_POSTS':
            return {
                ...state,
                profileList: action.payload.posts,
            };
        case "SEARCH_BY_KEYWORD":
            return {
                ...state,
                searchResult: action.payload,
            };
        default:
            return state;
    }
};
