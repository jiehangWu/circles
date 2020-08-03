import SockJS from 'sockjs';
import NodeRSA from 'node-rsa';
import JSEncrypt from 'jsencrypt';
import socket from './socket';
import { store } from '../../helpers/store';
//AES encrypt
const CryptoJS = require('crypto-js');
const url = 'ws://127.0.0.1:5000';
let restart = false;

const key = new NodeRSA({ b: 1024 });
let publick2 = key.exportKey('pkcs1-public');
let privatek2 = key.exportKey('pkcs1-private');
let publicK2 = new NodeRSA(publick2, 'pkcs1-public');
let privateK2 = new NodeRSA(privatek2, 'pkcs1-private');

let aesKey;

function HeartCheck(socket0, { userId, username }) {
  this.timeout = 1000; // 1s
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
      if (socket0.readyState === 1) {
        socket0.send(JSON.stringify({
          purpose: 'HEART_BEAT',
          payload: { userId, username },
        }));
      }
      self.serverTimeoutObj = setTimeout(() => {
        socket0.close();
        restart = false;
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
  chatApply: (sender) => ({
    type: 'CHAT_APPLY',
    payload: sender
  }),
  callee: ()=> ({
    type:'CALLEE'
  })
};

export default function SocketChat() {
  this.socket = socket;
  this.hc = undefined;
  this.username = '';
  this.userId = '';
  this.avatar = '';

  this.close = () => {
    this.socket.close();
  };

  this.logOutClose = () => {
    restart = true;
    this.socket.close();
  };

  this.reconnect = ({ userId, username, userAvatar }) => {
    this.userId = userId;
    this.username = username;
    this.userAvatar = userAvatar;
    let newSocket;
    if (!window.WebSocket) {
      // console.log('MozWebSocket');

      window.WebSocket = window.MozWebSocket;
      newSocket = new WebSocket(url);
    }
    if (window.WebSocket) {
      // console.log('WebSocket');
      newSocket = new WebSocket(url);
    } else {
      // console.log('SOCKJS');

      newSocket = new SockJS(url);
    }
    this.hc = new HeartCheck(newSocket, { userId, username });
    this.socket = newSocket;
    this.hc.start();
  };

  this.send = (message) => {
    if (this.socket.readyState === 1) {
      this.socket.send(message);
    }
  };

  this.sendMessage = (message) => {
    let encrypted = CryptoJS.AES.encrypt(message.payload.content, aesKey, {
      iv: aesKey,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    encrypted = encrypted.toString();
    message.payload.content = encrypted;
    this.send(JSON.stringify(message));
  }

  this.configSocket = ({ userId, username }) => {
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({
        purpose: 'CLIENT_ADD_USER',
        payload: {
          userId: this.userId,
          username: this.username,
          userAvatar: this.userAvatar,
        },
      }));
    };
    // receiving message handler
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log(message);
      if (message.purpose === 'SOCKET_INIT_CONTACTS') {
        // if new heartCheck, the old one will not be handled(bug)
        if (this.hc === undefined) {
          this.hc = new HeartCheck(this.socket, { userId, username });
          this.hc.start();
        }
        restart = false;
        // init contact list and empty message array
        store.dispatch(mapAction.socketInitContactsList(message.payload));
        store.dispatch(mapAction.socketInitContacts(message.payload));
      }
      // get public key 1, return public key 2
      if (message.purpose === 'PU1') {
        let publick1 = message.payload;
        let publicK1 = new NodeRSA(publick1, 'pkcs1-public');
        let pu2Trans = publicK1.encrypt(publick2,'base64' );
        this.send(JSON.stringify({
          purpose: 'PU2',
          payload: {
            userId,
            pu2Trans,
          },
        }));
      }
      if (message.purpose === "AES") {
        let aesStr = privateK2.decrypt(message.payload, 'utf8');
        aesKey = CryptoJS.enc.Utf8.parse(aesStr);
      }
      //
      //
      if (message.purpose === 'CLIENT_APPLY_VIDEO_CHAT') {
        let sender = message.payload.sender;
        store.dispatch(mapAction.chatApply(sender));
        store.dispatch(mapAction.callee());
        setTimeout(()=>{store.dispatch({
          type:'HANG_VIDEO',
        })},500);
      }
      //
      //
      if (message.purpose === 'CLIENT_REFUSE_VIDEO_CHAT') {
        store.dispatch({
          type:"REFUSE_VIDEO",
        });
      }
      //
      //
      if (message.purpose === 'SOCKET_ADD_CONTACT') {
        store.dispatch(mapAction.socketAddContact(message.payload));
        store.dispatch(mapAction.socketAddContactList(message.payload));
      }
      if (message.purpose === 'SOCKET_SEND_MESSAGE') {
        let enContent = message.payload.content;
        let decrypted = CryptoJS.AES.decrypt(enContent, aesKey, {
          iv: aesKey,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        message.payload.content = CryptoJS.enc.Utf8.stringify(decrypted);
        store.dispatch(mapAction.addOneMessageClient(message.payload));
        store.dispatch(mapAction.headContactListReceive({
          ...message.payload.sender,
          dateStr: new Date().toUTCString(),
        }));
        store.dispatch(mapAction.headHistoryContactsReceive({
          ...message.payload.sender,
          dateStr: new Date().toUTCString(),
        }));
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
          store.dispatch({
            type: 'HISTORY_CONTACTS_SET_READ',
            payload: message.payload.sender.userId,
          });
        } else {
          store.dispatch({
            type: 'LOCAL_SET_UNREAD',
            payload: message.payload.sender.userId,
          });
          store.dispatch({
            type: 'HISTORY_CONTACTS_SET_UNREAD',
            payload: message.payload.sender.userId,
          });
        }
      }
      this.hc.reset();
    };

    this.socket.onerror = () => {
      console.log('socket error');
      if (!restart) {
        restart = true;
        setTimeout(() => {
          this.reconnect({ userId: this.userId, username: this.username, userAvatar: this.userAvatar });
          this.configSocket({ userId: this.userId, username: this.username });
        }, 1000);
      }
    };

    this.socket.onclose = (e) => {
      console.log(e);
      if (!restart) {
        restart = true;
        setTimeout(() => {
          this.reconnect({ userId: this.userId, username: this.username, userAvatar: this.userAvatar });
          this.configSocket({ userId: this.userId, username: this.username });
        }, 1000);
      }
    };
  };
}
