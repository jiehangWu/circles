import SockJS from 'sockjs';

const url = 'ws://localhost:5000';
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
