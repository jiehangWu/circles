const initial = {
    uploadedImgLink: "",
    postList: []
}

export const posts = (state = initial, action) => {
    switch (action.type) {
        case "SUBMIT_POST": 
            return {
                uploadedImgLink: state.uploadedImgLink,
                postList: [action.payload, ...state.postList]
            }
        case "LIKE_POST":
            return {
                uploadedImgLink: state.uploadedImgLink,
                postList: [
                    ...state.postList.map((post) => {
                        if (post._id === action.payload.postId) {
                            return {
                                ...post,
                                likes: action.payload.likes,
                            }
                        } else {
                            return post;
                        }
                    })
                ]
            }
        case "LOAD_ALL":
            return {
                uploadedImgLink: state.uploadedImgLink,
                postList: action.payload,
            };
        case "DELETE_POST":
            return {
                uploadedImgLink: state.uploadedImgLink,
                postList: state.postList.filter((post) => post._id !== action.payload)
            };
        case "ADD_IMAGE":
            return {
                uploadedImgLink: action.payload,
                postList: state.postList,
            };
        case "CLEAR_IMAGE":
            return {
                uploadedImgLink: "",
                postList: state.postList,
            };
        default:
            return state;
    }
};