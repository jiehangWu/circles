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
    // console.log('login success');
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
  // console.log(response);
  const message = await response.text();
  // console.log(message);
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

const uploadAvatar = (data) => {
  return (dispatch) => {
    let avatarLink;
    fetch('http://localhost:5000/aws/upload', { method: 'POST', body: data }).then((response) => {
      return response.text();
    }).then((response) => {
      avatarLink = response;
      return fetch('http://localhost:5000/avatar', {
        method: 'PUT',
        body: JSON.stringify({ avatarLink }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    }).then((response) => {
      if (response.ok) {
        dispatch({
          type: 'UPLOAD_AVATAR',
          payload: avatarLink,
        });
      } else {
        console.log('error uploading avatar');
      }
    });


  //   let response1 = await fetch('http://localhost:5000/aws/upload', { method: 'POST', body: data });
  //   let avatarLink = await response1.text();
  //   console.log(avatarLink);
  //   let response2 = await fetch('http://localhost:5000/avatar', {
  //     method: 'PUT',
  //     body: JSON.stringify({ avatarLink }),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   });
  //   if (response2.ok) {
  //     dispatch({
  //       type: 'UPLOAD_AVATAR',
  //       payload: avatarLink,
  //     });
  //   } else {
  //     console.log('error uploading avatar');
  //   }
  }
}

const uploadGeolocation = (lat, lng) => {
  return dispatch => {
    fetch('http://localhost:5000/geolocation/home', {
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

const loadGeoCirclesList = () => async (dispatch) => {
  try {
    let response = await fetch('http://localhost:5000/geolocation/circleslist', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      response = await response.text();
      response = JSON.parse(response);
      
      dispatch({
        type: 'LOAD_GEOCIRCLES_LIST',
        payload: response
      })
    } else {
      throw new Error('Error fetching geocircles list');
    }
  } catch (err) {
    console.log(err.message);
  }
  
}

export const userActions = {
  login,
  register,
  logOut,
  uploadAvatar,
  uploadGeolocation,
  loadGeoCirclesList,
};

