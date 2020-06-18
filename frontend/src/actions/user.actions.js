import { history } from "../helpers/history";

const LOGIN = "login";
const REGISTER = "register";

const login = (username, password) => {
    return dispatch => {
        dispatch({
            type: "LOGIN_REQUEST",
            payload: username,
        });

        // to be replaced by real backend service call
        serviceCall(LOGIN, username, password).then((username) => {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: username
            });
            history.push('/home');
            console.log("login success");
        }).catch(e => {
            dispatch({
                type: "FAILED_MESSAGE",
                payload: e.message,
            });
            dispatch({
                type: "LOGIN_FAILED",
                payload: e.message
            });
        });
    };
};

const serviceCall = async (type, username, password) => {
    const response = await fetch('http://localhost:5000/' + type, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
    console.log(response);
    const message = await response.text();
    console.log(message);
    if (response.ok) {
        return true;
    } else {
        throw new Error(message);
    }
};


const register = (username, password) => {
    return dispatch => {
        dispatch({
            type: "REGISTER_REQUEST",
            payload: username,
        });

        serviceCall(REGISTER, username, password).then(() => {
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
                payload: e.message,
            });
            dispatch({
                type: "REGISTER_FAILED",
                payload: e.message,
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
// const fakeRegister = (username, password) => {
//     return new Promise((resolve) => {
//         const cb = () => {
//             console.log("fake login: username is " + username + ", password is " + password)
//             resolve(username);
//         };
//         setTimeout(cb, 1000);
//     });
// };



