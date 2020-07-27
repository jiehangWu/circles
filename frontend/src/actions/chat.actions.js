import {history} from "../helpers/history";

const loadChats = () => (dispatch) => {
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
  }).then((data) => {

    // console.log(data);
    // console.log(store.getState());

    dispatch({
      type: 'FILL_HISTORY_CHATS',
      payload: {
        userId: data.userId,
        chats:data.chats,
      },
    });
    dispatch({
      type: 'INIT_HISTORY_CONTACTS',
      payload: {
        userId: data.userId,
        chats: data.chats
      },
    });
  }).catch((err) => {

    // console.log(err);
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

const beginChat = (chatter)=> (dispatch)=> {
  new Promise((resolve => {
    dispatch({
      type: 'ADD_ONE_CONTACT',
      payload: chatter
    });
    resolve('next');
  })).then((str)=> {
    dispatch({
      type: 'HISTORY_CONTACTS_ADD_CONTACT',
      payload: chatter
    });
    return Promise.resolve('next');
  }).then((str) => {
    dispatch({
      type: "CHAT_SWITCH",
      payload: chatter
    });
    return Promise.resolve('next');
  }).then((str)=> {
    history.push('./chat');
  })
};



export const ChatActions = {
  loadChats,
  initChat,
  submitChatMessage,
  updateChatLog,
  beginChat,
};
