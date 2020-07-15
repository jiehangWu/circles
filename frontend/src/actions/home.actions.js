<<<<<<< HEAD
import { history } from '../helpers/history';

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
    console.log(parsedMsg);
    dispatch({
      type: 'LOAD_HOME',
      payload: parsedMsg,
    });
    // send message to reducer->socket server
    dispatch({
      type: 'SOCKET_ADD_USER',
      payload: {
        purpose: 'SOCKET_ADD_USER',
        payload: parsedMsg.username,
      },
    });
  }).catch((err) => {
    history.push('/login');
    console.log('going back');
  });
=======
import {history} from "../helpers/history";


const loadHome = () => {
    return dispatch => {
        fetch('http://localhost:5000/home', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("error in response");
        }).then((msg) => {
            let parsedMsg = JSON.parse(msg);
            console.log(parsedMsg);
            dispatch({
                type: "LOAD_HOME",
                payload: parsedMsg
            });
            // send message to socket to add user
            dispatch({
                type: "CLIENT_ADD_USER",
                payload: {
                    purpose: "CLIENT_ADD_USER",
                    payload: parsedMsg.username
                }
            });
            // add self as the current chatter
            dispatch({
                type: "CHAT_SWITCH",
                payload: parsedMsg.username
            })
        }).catch((err) => {
            history.push("/login");
            console.log("going back");
        });
    };
>>>>>>> origin/chat_temp
};

export const HomeActions = {
  loadHome,
};
