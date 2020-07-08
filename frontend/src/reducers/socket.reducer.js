// store the socket in Reducer and can reconnect(i.e., replace) easily
// also used to send message to server(a little strange, but the information can be managed together)

import socket from "../components/Chat/socket";
export const socketReducer = (init = socket, action)=> {
    if (action.type === 'SOCKET_CONNECT') {
        return action.payload;
    }
    if (action.type === "SOCKET_CLOSE") {
        if (init !== null) {
            init.close();
        }
        return init;
    }
    if (action.type === 'SOCKET_ADD_USER') {
        if (init !== null) {
            init.send(JSON.stringify(action.payload));
        }
        return init;
    }

    return init;
};