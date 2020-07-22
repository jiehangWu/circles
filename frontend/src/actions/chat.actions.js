const loadAllChats = () => {
    return dispatch => {
        fetch('https://circles-ubc-api.azurewebsites.net/chat', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('error when fetching all chats');
            }
        }).then((chats) => {
            console.log(chats);
            dispatch({
                type: "INIT_CHAT",
                payload: chats
            });
        }).catch((err) => {
            console.log(err);
        });
    };
};




export const initChat = (messages) => {
    return {
        type: 'INIT_CHAT',
        payload: messages,
    }
}

// const loadChat = () => {
//     return {
//         messages: ["a", "b"],
//         users: ["usr1", "usr2"]
//     }
// }



export const submitChatMessage = (message, time) => {
    return {
        type: 'ADD_CHAT_MSG',
        message: message,
        time: time
    }
}

export const updateChatLog = (message, userName) => {
    return {
        type: 'UPDATE_LOG',
        message: message,
        userName: userName
    }
}

export const ChatActions = {
    loadAllChats,
    initChat,
    submitChatMessage,
    updateChatLog
};