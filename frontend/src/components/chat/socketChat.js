import SockJS from 'sockjs';
import socket from './socket';
import { store } from '../../helpers/store';

const url = 'ws://127.0.0.1:5000';

function HeartCheck(socket0, { userId, username }) {
  this.timeout = 2000; // 2s
  this.timeoutObj = null;
  this.serverTimeoutObj = null;
  this.reset = () => {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    this.start();
  };
  this.start = () => {
    const self = this;
    this.timeoutObj = setTimeout(() => {
      socket0.send(JSON.stringify({
        purpose: 'HEART_BEAT',
        payload: { userId, username },
      }));
      self.serverTimeoutObj = setTimeout(() => {
        socket0.close();
      }, self.timeout);
    }, this.timeout);
  };
}

const mapAction = {
  socketAddContact: (user) => ({
    type: 'ADD_ONE_CONTACT',
    payload: user,
  }),
  socketAddContactList: (user) => ({
    type: 'ADD_ONE_CONTACT_LIST',
    payload: user,
  }),
  socketInitContactsList: (users) => ({
    type: 'SOCKET_INIT_CONTACTS_LIST',
    payload: users,
  }),
  socketInitContacts: (users) => ({
    type: 'SOCKET_INIT_CONTACTS',
    payload: users,
  }),
  addOneMessageClient: (message) => ({
    type: 'ADD_ONE_MESSAGE_CLIENT',
    payload: message,
  }),
  headContactListReceive: (user) => ({
    type: 'HEAD_CONTACT_LIST_RECEIVE',
    payload: user,
  }),
  headContactListSend: (user) => ({
    type: 'HEAD_CONTACT_LIST_SEND',
    payload: user,
  }),
  headHistoryContactsReceive: (user) => ({
    type: 'HEAD_HISTORY_CONTACTS_RECEIVE',
    payload: user,
  }),
  headHistoryContactsSend: (user) => ({
    type: 'HEAD_HISTORY_CONTACTS_SEND',
    payload: user,
  }),
};

export default function SocketChat() {
  this.socket = socket;
  this.restart = false;
  this.hc = undefined;
  this.username = '';
  this.userId = '';

  this.close = () => {
    this.socket.close();
  };

  this.reconnect = () => {
    if (!window.WebSocket) {

      // console.log('MozWebSocket');

      window.WebSocket = window.MozWebSocket;
      this.socket = new WebSocket(url);
    }
    if (window.WebSocket) {

      // console.log('WebSocket');
      this.socket = new WebSocket(url);
    } else {
      // console.log('SOCKJS');

      this.socket = new SockJS(url);
    }
  };

  this.send = (message) => {
    this.socket.send(message);
  };

  this.configSocket = ({ userId, username }) => {
    this.userId = userId;
    this.username = username;
    this.socket.onopen = () => {

    };
    // receiving message handler
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log(message);
      if (message.purpose === 'SOCKET_INIT_CONTACTS') {
        // if new heartCheck, the old one will not be handled(bug)
        if (this.hc === undefined || this.restart === true) {
          this.hc = new HeartCheck(this.socket, { userId, username });
          this.restart = false;
        }
        this.hc.start();
        // init contact list and empty message array
        store.dispatch(mapAction.socketInitContactsList(message.payload));
        store.dispatch(mapAction.socketInitContacts(message.payload));
      }
      if (message.purpose === 'SOCKET_ADD_CONTACT') {
        store.dispatch(mapAction.socketAddContact(message.payload));
        store.dispatch(mapAction.socketAddContactList(message.payload));
      }
      if (message.purpose === 'SOCKET_SEND_MESSAGE') {
        store.dispatch(mapAction.addOneMessageClient(message.payload));
        store.dispatch(mapAction.headContactListReceive({
          ...message.payload.sender,
          dateStr: new Date().toUTCString(),
        }));
        store.dispatch(mapAction.headHistoryContactsReceive({
          ...message.payload.sender,
          dateStr: new Date().toUTCString(),
        }));
        setTimeout(() => {
          const currentChat = store.getState().currentChatPerson;
          if (message.payload.sender.userId === currentChat.userId) {
            store.dispatch({
              type: 'CLIENT_SET_READ',
              payload: {
                purpose: 'CLIENT_SET_READ',
                payload: {
                  setUserId: message.payload.receiver.userId,
                  userId2: message.payload.sender.userId,
                  bool: true,
                },
              },
            });
            store.dispatch({
              type: 'LOCAL_SET_READ',
              payload: message.payload.sender.userId,
            });
          } else {
            store.dispatch({
              type: 'LOCAL_SET_UNREAD',
              payload: message.payload.sender.userId,
            });
          }
        }, 1000);
      }
      this.hc.reset();
    };
    this.socket.onerror = () => {

      // console.log('socket error');

      this.reconnect();
      this.configSocket({ userId: this.userId, userName: this.userName });
      this.restart = true;
    };
    this.socket.onclose = (e) => {

      // console.log(e);

      this.reconnect({ userId: this.userId, userName: this.userName });
      this.restart = true;
    };
  };
}
