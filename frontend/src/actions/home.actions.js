import { history } from "../helpers/history";

const loadHome = () => (dispatch) => {
  fetch('http://localhost:5000/home', {
    method: 'GET',
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
    console.log(parsedMsg);
    dispatch({
      type: 'LOAD_HOME',
      payload: parsedMsg,
    });
    return Promise.resolve(parsedMsg);
  }).then((parsedMsg) => {
    // send message to reducer->socket server
    dispatch({
      type: 'SOCKET_INIT',
      payload: {
        userId: parsedMsg.userId,
        username: parsedMsg.username,
        userAvatar: parsedMsg.avatar
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

const searchKeyword = (keyword) => (dispatch) => {
  console.log("searched", keyword);
  fetch('http://localhost:5000/search/'+ keyword, {
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
    throw new Error('error when searching for result');
  }).then((posts) => {
    console.log("search results", posts);
    dispatch({
      type: 'SEARCH_BY_KEYWORD',
      payload: posts,
    });
  }).catch((err) => {
    console.log(err);
  });
};

export const HomeActions = {
  loadHome,
  searchKeyword,
};