const initial = {
    users: [ ],
    messages: [ "abc", "abcd"]
}

export const chatMessage = (state = initial, action) => {
    if (action.type === 'ADD_CHAT_MSG') {
        return {
            users: state.users,
            messages: state.messages.concat(action.message)
        };
    } else if (action.type === 'INIT_MSG') {
        return {
            users: state.users,
            messages: action.payload
        }        
}
    // if (action.type === 'SOCKET_ADD_CONTACT') {
    //     let addArray = init.slice();
    //     addArray.splice(addArray.length, 0, action.payload);
    //     console.log(addArray);
    //     return addArray;
    // }

    return initial;
};



