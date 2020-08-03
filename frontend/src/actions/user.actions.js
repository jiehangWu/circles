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
    const response = await fetch(`https://circles-ubc-api.azurewebsites.net/${type}`, {
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
    const message = await response.text();
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
        dispatch({
            type: 'CHAT_CLEAR',
        });
        dispatch({
            type: 'CLEAR_ONLINE',
        });
        dispatch({
            type: 'CLEAR_HISTORY_CONTACTS',
        });
        dispatch({
            type: 'CLEAR_CHAT_PERSON',
        });
        dispatch({
            type: 'CLEAR_VIDEO_CHAT',
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
    await fetch('https://circles-ubc-api.azurewebsites.net/logout', {
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
        fetch('https://circles-ubc-api.azurewebsites.net/aws/upload', { method: 'POST', body: data }).then((response) => {
            return response.text();
        }).then((response) => {
            avatarLink = response;
            return fetch('https://circles-ubc-api.azurewebsites.net/avatar', {
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
                throw new Error('error uploading avatar');
            }
        }).catch((err) => {
            console.error(err);
        });
    }
};

const uploadGeolocation = (lat, lng) => {
    return dispatch => {
        fetch('https://circles-ubc-api.azurewebsites.net/geolocation/home', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ lat, lng }),
        }).then((response) => {
            if (response.ok) {
                dispatch({
                    type: "UPDATE_GEOLOCATION",
                    payload: [lat, lng]
                });
            }
        }).catch((err) => {
            console.error(err);
        });
    }
};

const loadGeoCirclesList = () => async (dispatch) => {
    try {
        let response = await fetch('https://circles-ubc-api.azurewebsites.net/geolocation/circleslist', {
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
        console.error(err);
    }
};

const loadGeolocation = (id) => async (dispatch) => {
    try {
        let response = await fetch('http://localhost:5000/geolocation/'+ id, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            response = await response.text();
            response = JSON.parse(response);
            dispatch({
                type: 'LOAD_GEOLOCATION',
                payload: response
            })
        } else {
            throw new Error('Error fetching geolocation');
        }
    } catch (err) {
        console.error(err);
    }
};

const cancelFirstTimer = () => async (dispatch) => {
    try {
        let response = await fetch('http://localhost:5000/firstTimer', {
            method: 'PUT',
            credentials: 'include',
        });
        if (response.ok) {
            response = await response.text();
            response = JSON.parse(response);
            dispatch({
                type: 'CANCEL_FIRST_TIMER',
                payload: response
            })
        } else {
            throw new Error('Error canceling first time user');
        }
    } catch (err) {
        console.error(err);
    }
};

export const userActions = {
    login,
    register,
    logOut,
    uploadAvatar,
    uploadGeolocation,
    loadGeoCirclesList,
    loadGeolocation,
    cancelFirstTimer,
};

