import { history } from '../helpers/history';

const LOGIN = 'login';
const REGISTER = 'register';

const login = (registerName, password) => (dispatch) => {
  dispatch({
    type: 'LOGIN_REQUEST',
    payload: registerName,
  });

  serviceCall(LOGIN, registerName, password).then((registerName) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: registerName,
    });
    history.push('/home');
    console.log('login success');
  }).catch((e) => {
    dispatch({
      type: 'FAILED_MESSAGE',
      payload: e.message,
    });
    dispatch({
      type: 'LOGIN_FAILED',
      payload: e.message,
    });
  });
};

const serviceCall = async (type, registerName, password) => {
  const response = await fetch(`http://localhost:5000/${type}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      registerName,
      password,
    }),
    credentials: 'include',
  });
  console.log(response);
  const message = await response.text();
  console.log(message);
  if (response.ok) {
    return true;
  }
  throw new Error(message);
};

const logOut = () => (dispatch) => {
  dispatch({
    type: 'LOG_OUT',
  });
  serviceCallLogOut().then(() => {
    dispatch({
      type: 'LOG_OUT',
    });
    dispatch({
      type: 'SOCKET_CLOSE',
    });
    history.push('/login');
    dispatch({
      type: 'SUCCESS_MESSAGE',
      payload: 'logout succesful',
    });
  }).catch((e) => {
    dispatch({
      type: 'FAILED_MESSAGE',
      payload: 'logout failed',
    });
  });
};

const serviceCallLogOut = async () => {
  await fetch('http://localhost:5000/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

const register = (registerName, password) => (dispatch) => {
  dispatch({
    type: 'REGISTER_REQUEST',
    payload: registerName,
  });

  serviceCall(REGISTER, registerName, password).then(() => {
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: registerName,
    });
    history.push('/login');
    dispatch({
      type: 'SUCCESS_MESSAGE',
      payload: 'register success!',
    });
  }).catch((e) => {
    dispatch({
      type: 'FAILED_MESSAGE',
      payload: e.message,
    });
    dispatch({
      type: 'REGISTER_FAILED',
      payload: e.message,
    });
  });
};

export const userActions = {
  login,
  register,
  logOut
};

