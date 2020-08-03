const log4js = require('log4js');
const logger = log4js.getLogger();
const chatController = require('../controller/ChatController');
logger.level="OFF";
const randomstring = require("randomstring");
//AES encrypt
const CryptoJS = require("crypto-js");
//RSA encrypt
const NodeRSA = require('node-rsa');

const key = new NodeRSA({b: 1024});
let publick1 = key.exportKey('pkcs1-public');
let privatek1 = key.exportKey('pkcs1-private');
let publicK1 = new NodeRSA(publick1, 'pkcs1-public');
let privateK1 = new NodeRSA(privatek1, 'pkcs1-private');


let userAES = {};
let socketControl = {};
let userSocketList = {};
let userInfoList = {};

const socketFunction = (ws, req)=> {
    logger.info('WebSocket is connected...');
    logger.info("hello");
    ws.on('message', function incoming(message) {
        let m = JSON.parse(message);
        //HEART_BEAT
        if (m.purpose === "HEART_BEAT") {
            //logger.info(wss.clients.size);
            //logger.info(m);
            ws.send(JSON.stringify({
                purpose: "HEART_BEAT"
            }));
            if (socketControl[m.payload.userId]) {
                clearTimeout(socketControl[m.payload.userId]);
            }
            let tm = setTimeout(() => {
                logger.info("delete " + m.payload.username);
                userSocketList[m.payload.userId].terminate();
                delete userSocketList[m.payload.userId];
                delete userAES[m.payload.userId];
                delete userInfoList[m.payload.userId];
                Object.values(userSocketList).forEach((client) => {
                    client.send(JSON.stringify({
                        purpose: "SOCKET_INIT_CONTACTS",
                        payload: userInfoList
                    }));
                });
                delete socketControl[m.payload.userId];
            }, 5000);
            socketControl[m.payload.userId] = tm;
        }
        // SOCKET_ADD_USER
        if (m.purpose === "CLIENT_ADD_USER") {
            //logger.info(m);
            if (userSocketList[m.payload.userId]) {
                userSocketList[m.payload.userId].terminate();
            }
            userSocketList[m.payload.userId] = ws;
            userInfoList[m.payload.userId] = {username: m.payload.username, userAvatar: m.payload.userAvatar};
            logger.info(m);
            logger.info(userInfoList);
            // send publikc key1
            ws.send(JSON.stringify({
                purpose: "PU1",
                payload: publick1
            }));
            Object.values(userSocketList).forEach((client) => {
                client.send(JSON.stringify({
                    purpose: "SOCKET_INIT_CONTACTS",
                    payload: userInfoList
                }));
            });
            logger.info(Object.values(userInfoList));
        }
        if (m.purpose === 'PU2') {
            let userId = m.payload.userId;
            let pu2Trans = m.payload.pu2Trans;
            let k2 = privateK1.decrypt(pu2Trans, 'utf8');
            let publicK2 = new NodeRSA(k2, 'pkcs1-public');
            let aesStr = randomstring.generate(16);
            ws.send(JSON.stringify({
                purpose: "AES",
                payload: publicK2.encrypt(aesStr, 'base64')
            }));
            userAES[userId] = CryptoJS.enc.Utf8.parse(aesStr);
        }
        if (m.purpose === "CLIENT_SEND_MESSAGE") {
            logger.info(m);
            let message = m.payload;
            let receiver = message.receiver;
            let sender = message.sender;
            let enContent = message.content;
            let decrypted = CryptoJS.AES.decrypt(enContent, userAES[sender.userId], {
                iv: userAES[sender.userId],
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
            if (receiver.userId !== sender.userId && userSocketList[receiver.userId]) {
                logger.info("real message" + decrypted);
                let encrypted = CryptoJS.AES.encrypt(decrypted, userAES[receiver.userId], {
                    iv: userAES[receiver.userId],
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                encrypted = encrypted.toString();
                message.content = encrypted;
                userSocketList[receiver.userId].send(JSON.stringify({
                    purpose: "SOCKET_SEND_MESSAGE",
                    payload: message
                }));
            }
            logger.info(chatController.addChatMessage(decrypted, message.date, message.sender.userId, message.receiver.userId));
        }
        if (m.purpose === 'CLIENT_SET_READ') {
            let message = m.payload;
            logger.info(m);
            chatController.setChatStatus(message.setUserId, message.userId2, message.bool);
        }
        if (m.purpose === 'CLIENT_APPLY_VIDEO_CHAT') {
            let message = m.payload;
            let receiver = message.receiver;
            let sender = message.sender;
            if (receiver.userId !== sender.userId && userSocketList[receiver.userId]) {
                userSocketList[receiver.userId].send(JSON.stringify({
                    purpose: "CLIENT_APPLY_VIDEO_CHAT",
                    payload: message
                }));
            }
        }
        if (m.purpose === 'CLIENT_REFUSE_VIDEO_CHAT') {
            let message = m.payload;
            let receiver = message.receiver;
            let sender = message.sender;
            if (receiver.userId !== sender.userId && userSocketList[receiver.userId]) {
                userSocketList[receiver.userId].send(JSON.stringify({
                    purpose: "CLIENT_REFUSE_VIDEO_CHAT",
                    payload: message
                }));
            }
        }
    });
}

module.exports = socketFunction;