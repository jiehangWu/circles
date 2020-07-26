import {history} from "../helpers/history";

const loadHome = () => (dispatch) => {
  fetch('http://localhost:5000/home', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error('error in response');
  }).then((msg) => {
    const parsedMsg = JSON.parse(msg);
    // console.log(parsedMsg);
    dispatch({
      type: 'LOAD_HOME',
      payload: parsedMsg,
    });
    // send message to reducer->socket server
    dispatch({
      type: 'SOCKET_INIT',
      payload: {
        userId: parsedMsg.userId,
        username: parsedMsg.username,
      },
    });
    dispatch({
      type: 'CLIENT_ADD_USER',
      payload: {
        purpose: 'CLIENT_ADD_USER',
        payload: {
          userId: parsedMsg.userId,
          username: parsedMsg.username,
          userAvatar: parsedMsg.avatar
        },
      },
    });
    // add self as the current chatter
    dispatch({
      type: 'CHAT_SWITCH',
      payload: {
        userId: parsedMsg.userId,
        username: parsedMsg.username,
        userAvatar: parsedMsg.avatar,
      },
    });
  }).catch((err) => {
    history.push('/login');
    // console.log('going back');
  });
};

export const HomeActions = {
    loadHome,
};