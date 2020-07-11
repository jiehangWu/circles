// store the socket in Reducer and can reconnect(i.e., replace) easily
// also used to send message to server(a little strange, but the information can be managed together)
import socket from "../components/chat/socket";
let add = 0;


export const chatSocketReducer = (init = socket, action)=> {
    if (action.type === 'SOCKET_CONNECT') {
        console.log("close" + add);
        add++;
        init.close();
        return action.payload;
    }
    if (action.type === "SOCKET_CLOSE") {
        if (init !== null) {
            init.close();
        }
        return init;
    }
    if (action.type === 'CLIENT_ADD_USER') {
        if (init !== null) {
            init.send(JSON.stringify(action.payload));
        }
        return init;
    }
    if (action.type === "CLIENT_SEND_MESSAGE") {
        if (init !== null) {
            console.log(action.payload);
            init.send(JSON.stringify({
                purpose: "CLIENT_SEND_MESSAGE",
                payload: action.payload
            }));
        }
        return init;
    }

    return init;
};