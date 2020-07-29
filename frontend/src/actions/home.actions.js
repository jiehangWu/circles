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

const uploadGeolocation = (lat, lng) => {
  return dispatch => {
    fetch('http://localhost:5000/home/geolocation', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ lat, lng }),
    }).then((response) => {
      if (response.ok) {
        console.log("added gelocation");
        dispatch({
          type: "UPDATE_GEOLOCATION",
          payload: [lat, lng]
      });
      }
    }).catch((err) => {
      console.log(err);
      console.log("failed added gelocation");
    });
  }
}

export const HomeActions = {
  loadHome,
  uploadGeolocation,
};