const mockState = {
    counter: 3,
    postList: [
        {
            postID: 2,
            userID: 'Jerome',
            time: new Date(),
            content: `It's a nice day today! Let's go hiking!`,
            likes: 2,
            isLiked: false,
        },
        {   
            postID: 1,
            userID: 'Eric',
            time: new Date(),
            content: 'I\'m so bored. Anyone want to play video games together?',
            likes: 13,
            isLiked: false,
        }
    ]
}

export const posts = (state = mockState, action) => {
    switch (action.type) {
        case "SUBMIT_POST": 
            return {
                counter: state.counter + 1,
                postList: [{
                    postID: state.counter,
                    userID: action.payload.userID,
                    time: action.payload.time,
                    content: action.payload.content,
                    likes: 0,
                    isLiked: false,
                }, ...state.postList]
            }
        case "LIKE_POST":
            return {
                counter: state.counter,
                postList: [
                    ...state.postList.map((post) => {
                        if (post.postID === action.payload.postID) {
                            return {
                                ...post,
                                isLiked: !post.isLiked,
                                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                            }
                        } else {
                            return post;
                        }
                    })
                ]
            }
        default:
            return state;
    }
};