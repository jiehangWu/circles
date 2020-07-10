import SockJS from 'sockjs';

const url = 'ws://127.0.0.1:5000';
let socket;
const startSocket = () => {
  if (!window.WebSocket) {
    console.log('MozWebSocket');
    window.WebSocket = window.MozWebSocket;
    socket = (new WebSocket(url));
  }
  if (window.WebSocket) {
    console.log('WebSocket');
    socket = (new WebSocket(url));
  } else {
    console.log('SOCKJS');
    socket = (new SockJS(url));
  }
};

startSocket();

export default socket;
