import SockJS from 'sockjs';

const url = 'wss://circles-ubc-api.azurewebsites.net';
let socket;
const startSocket = () => {
    if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket;
        socket = (new WebSocket(url));
    }
    if (window.WebSocket) {
        socket = (new WebSocket(url));
    } else {
        socket = (new SockJS(url));
    }
};

startSocket();

export default socket;
