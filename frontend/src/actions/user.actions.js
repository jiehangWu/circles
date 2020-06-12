import {history} from "../helpers/history";

const login = (username, password) => {
    return dispatch => {
        dispatch({
            type: "LOGIN_REQUEST",
            payload: username,
        });

        // to be replaced by real backend service call
        fakeLogin(username, password).then((username) => {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: username
            });
            history.push('/');
            console.log("login success");
        }).catch(e => {
            dispatch({
               type: "FAILED_MESSAGE",
               payload: e,
            });
            dispatch({
                type: "LOGIN_FAILED",
                payload: e
            });
        });
    };
};

const register = (username, password) => {
    return dispatch => {
        dispatch({
            type: "REGISTER_REQUEST",
            payload: username,
        });

        // to be replaced by real backend service call
        fakeRegister(username, password).then((username) => {
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: username,
            });
            history.push('/login');
            dispatch({
                type: "SUCCESS_MESSAGE",
                payload: "register success!",
            });
        }).catch(e => {
            dispatch({
                type: "FAILED_MESSAGE",
                payload: e,
            });
            dispatch({
                type: "REGISTER_FAILED",
                payload: e,
            });
        });
    };
};

export const userActions = {
    login,
    register,
};


// This should haven't been in this module
const fakeLogin = (username, password) => {
    return new Promise((resolve) => {
        const cb = () => {
            console.log("fake login: username is " + username + ", password is " + password)
            resolve(username);
        };
        setTimeout(cb, 1000);
    });
};

// This should haven't been in this module
const fakeRegister = (username, password) => {
    return new Promise((resolve) => {
        const cb = () => {
            console.log("fake login: username is " + username + ", password is " + password)
            resolve(username);
        };
        setTimeout(cb, 1000);
    });
};



