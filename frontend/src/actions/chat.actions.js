const enterChat = (chat) => {
    // return dispatch => {
    //     fetch('http://localhost:9000/post', {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify(post)
    //     }).then((res) => {
    //         if (res) {
    //             return response.json();
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // };
};

const loadChat = () => {
    return {
        messages: ["a", "b"],
        users: ["usr1", "usr2"]
    }
}

export const initChat = (messages) => {
    return {
        type: 'INIT_CHAT',
        payload: messages,
    }
}


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
    loadChat,
    initChat,
    submitChatMessage,
    updateChatLog
};