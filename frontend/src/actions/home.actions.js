import { history } from '../helpers/history';

const loadHome = () => (dispatch) => {
  fetch('/home', {
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
    console.log(parsedMsg);
    dispatch({
      type: 'LOAD_HOME',
      payload: parsedMsg,
    });
    // send message to reducer->socket server
    // dispatch({
    //   type: 'SOCKET_ADD_USER',
    //   payload: {
    //     purpose: 'SOCKET_ADD_USER',
    //     payload: parsedMsg.username,
    //   },
    // });
  }).catch((err) => {
    history.push('/login');
    console.log('going back');
  });
};

export const HomeActions = {
  loadHome,
};
