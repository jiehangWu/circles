import {history} from '../helpers/history';


const login = (registerName, password) => async (dispatch) => {
    try {
        const response = await fetch(`https://circles-ubc-api.azurewebsites.net/login`, {
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
        if (response.ok) {
            const user = await response.json();
            dispatch({
                type: 'LOAD_HOME',
                payload: {
                    userId: user._id,
                    username: user.username,
                    registerName: user.registerName,
                    avatar: user.avatar,
                    firstTimer: user.firstTimer
                }
            });
            dispatch({
                type: 'SOCKET_INIT',
                payload: {
                    userId: user._id,
                    username: user.username,
                    userAvatar: user.avatar
                },
            });
            dispatch({
                type: 'CHAT_SWITCH',
                payload: {
                    userId: user._id,
                    username: user.username,
                    userAvatar: user.avatar
                },
            });
            history.push('/home');
        } else {
            throw new Error('log in failed');
        }
    } catch (e) {
        console.error(e.message);
    }
};


const logOut = () => (dispatch) => {
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
        payload: 'logout successful',
    });
};

const register = (registerName, password) => async (dispatch) => {
    try {
        const response = await fetch(`https://circles-ubc-api.azurewebsites.net/register`, {
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
        if (response.ok) {
            history.push('/login');
            dispatch({
                type: 'SUCCESS_MESSAGE',
                payload: 'register success!',
            });
        } else {
            throw new Error('register failed');
        }
    } catch (e) {
        dispatch({
            type: 'FAILED_MESSAGE',
            payload: e.message,
        });
        console.error(e.message);
    }
};

const uploadAvatar = (data, userId) => {
    return (dispatch) => {
        let avatarLink;
        fetch('https://circles-ubc-api.azurewebsites.net/aws/upload', {
            method: 'POST',
            body: data
        }).then((response) => {
            return response.text();
        }).then((response) => {
            avatarLink = response;
            return fetch('https://circles-ubc-api.azurewebsites.net/avatar', {
                method: 'PUT',
                body: JSON.stringify({avatarLink, userId}),
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

const uploadGeolocation = (userId, lat, lng) => {
    return dispatch => {
        fetch('https://circles-ubc-api.azurewebsites.net/geolocation/home', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({lat, lng, userId}),
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

const loadGeoCirclesList = (userId) => async (dispatch) => {
    try {
        let response = await fetch('https://circles-ubc-api.azurewebsites.net/geolocation/circleslist' + '/' + userId, {
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
        let response = await fetch('https://circles-ubc-api.azurewebsites.net/geolocation/' + id, {
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

const cancelFirstTimer = (userId) => async (dispatch) => {
    try {
        let response = await fetch('https://circles-ubc-api.azurewebsites.net/firstTimer', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({userId}),
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

