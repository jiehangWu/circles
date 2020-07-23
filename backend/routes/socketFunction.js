const log4js = require('log4js');
const logger = log4js.getLogger();
const chatController = require('../controller/ChatController');

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
            userSocketList[m.payload.userId] = ws;
            userInfoList[m.payload.userId] = m.payload.username;
            logger.info(m);
            logger.info(userInfoList);
            Object.values(userSocketList).forEach((client) => {
                client.send(JSON.stringify({
                    purpose: "SOCKET_INIT_CONTACTS",
                    payload: userInfoList
                }));
            });
            logger.info(Object.values(userInfoList));
        }
        if (m.purpose === "CLIENT_SEND_MESSAGE") {
            logger.info(m);
            let message = m.payload;
            let receiver = message.receiver;
            if (userSocketList[receiver.userId]) {
                userSocketList[receiver.userId].send(JSON.stringify({
                    purpose: "SOCKET_SEND_MESSAGE",
                    payload: message
                }));
            }
            chatController.addChatMessage(message.content, message.date, message.sender.userId, message.receiver.userId);
        }
        if (m.purpose === 'CLIENT_SET_READ') {
            let message = m.payload;
            chatController.setChatStatus(message.setUserId, message.userId2, message.bool);
        }
    });
}

module.exports = socketFunction;