const mockState = {
    postList: [
        {
            postId: 2,
            userId: 'Jerome',
            time: new Date(),
            content: `It's a nice day today! Let's go hiking!`,
            likes: 2,
        },
        {   
            postId: 1,
            userId: 'Eric',
            time: new Date(),
            content: 'I\'m so bored. Anyone want to play video games together?',
            likes: 13,
        }
    ]
}

export const posts = (state = mockState, action) => {
    switch (action.type) {
        case "SUBMIT_POST": 
            return {
                postList: [action.payload, ...state.postList]
            }
        case "LIKE_POST":
            return {
                postList: [
                    ...state.postList.map((post) => {
                        if (post.postId === action.payload.postId) {
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
                postList: action.payload,
            };
        default:
            return state;
    }
};