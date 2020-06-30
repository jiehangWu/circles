import { history } from "../helpers/history";

const LOGIN = "login";
const REGISTER = "register";

const login = (username, password) => {
    return dispatch => {
        dispatch({
            type: "LOGIN_REQUEST",
            payload: username,
        });

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
        credentials: 'include',
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

const logOut = ()=> {
    return dispatch => {
        dispatch({
            type: "LOG_OUT",
        });
        serviceCallLogOut().then(() => {
            dispatch({
                type: "LOG_OUT",
            });
            history.push('/login');
            dispatch({
                type: "SUCCESS_MESSAGE",
                payload: "logout succesful",
            });
        }).catch(e => {
            dispatch({
                type: "FAILED_MESSAGE",
                payload: "logout failed",
            });
        });
    };
};

const serviceCallLogOut = async () => {
    await fetch('http://localhost:5000/logout', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })};

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
    logOut
};



