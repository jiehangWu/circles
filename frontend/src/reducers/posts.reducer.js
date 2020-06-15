const mockState = {
    postList: [
        {
            userID: 'Jerome',
            time: '20 h',
            content: `It's a nice day today! Let's go hiking!`
        },
        {
            userID: 'Eric',
            time: '1h',
            content: 'I\'m so bored. Anyone want to play Forza Horizon together?'
        }
    ]
}

export const posts = (state = mockState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};