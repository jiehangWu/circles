import { history } from "../helpers/history";

const loadHome = () => (dispatch) => {
    fetch('https://circles-ubc-api.azurewebsites.net/home', {
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
        console.error(err);
        history.push('/login');
    });
};

const searchKeyword = (keyword) => (dispatch) => {
    fetch('https://circles-ubc-api.azurewebsites.net/search/'+ keyword, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('error when searching for result');
    }).then((posts) => {
        dispatch({
            type: 'SEARCH_BY_KEYWORD',
            payload: posts,
        });
    }).catch((err) => {
        console.error(err);
    });
};

export const HomeActions = {
    loadHome,
    searchKeyword,
};