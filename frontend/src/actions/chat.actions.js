// reserve for modify
const loadAllChats = () => (dispatch) => {
  fetch('http://localhost:5000/chat/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('error when fetching all chats');
  }).then((chats) => {
    console.log(chats);
    dispatch({
      type: 'INIT_CHAT',
      payload: chats,
    });
  }).catch((err) => {
    console.log(err);
  });
};

export const initChat = (messages) => ({
  type: 'INIT_CHAT',
  payload: messages,
});

// const loadChat = () => {
//     return {
//         messages: ["a", "b"],
//         users: ["usr1", "usr2"]
//     }
// }

export const submitChatMessage = (message, time) => ({
  type: 'ADD_CHAT_MSG',
  message,
  time,
});

export const updateChatLog = (message, userName) => ({
  type: 'UPDATE_LOG',
  message,
  userName,
});

export const ChatActions = {
  loadAllChats,
  initChat,
  submitChatMessage,
  updateChatLog,
};
