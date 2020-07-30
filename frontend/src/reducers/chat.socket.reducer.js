// store the socket in Reducer and can reconnect(i.e., replace) easily
// also used to send message to server
import SocketChat from '../components/chat/socketChat';
const socketChat = new SocketChat();

export const chatSocketReducer = (init = socketChat, action) => {
  if (action.type === 'SOCKET_INIT') {
    socketChat.reconnect(action.payload);
    socketChat.configSocket(action.payload);
    return socketChat;
  }
  if (action.type === 'SOCKET_CLOSE') {
    init.logOutClose();
    return init;
  }
  if (action.type === 'CLIENT_ADD_USER') {
    init.send(JSON.stringify(action.payload));

    // console.log(JSON.stringify(action.payload));
    return init;
  }
  if (action.type === 'CLIENT_SEND_MESSAGE') {
    // console.log(action.payload);

    init.sendMessage(action.payload);
    return init;
  }
  if (action.type === 'CLIENT_SET_READ') {
    init.send(JSON.stringify(action.payload));
    return init;
  }
  return init;
};
