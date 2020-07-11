const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const http = require('http');
const mongoose = require('mongoose');
const keys = require('./secrets/Keys')
const bodyParser = require('body-parser');
const WebSocket = require('ws');

require('dotenv').config();
// Make sure models are required
require('./model/User');
require('./model/Chat');
require('./model/Message');
require('./model/Post');
require('./model/Tag');

const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'info';

// The ordering is important too
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server , maxPayload:200});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
const authRoutes = require('./routes/authRoutes');
const awsRoutes = require('./routes/awsRoutes');
const postRoutes = require('./routes/postRoutes');

const MAX_AGE = 15 * 60 * 1000;
app.use(session({
    name: 'circles',
    resave: true,
    saveUninitialized: true,
    secret: keys.COOKIE_SECRET,
    cookie: {
        domain: "localhost",
        maxAge: MAX_AGE,
    },
}));

app.use('/', authRoutes);
app.use('/aws', awsRoutes);
app.use('/post', postRoutes);

let socketControl = {};
let userList = {};

wss.on('connection', (ws,req) => {
    logger.info('WebSocket is connected...');
    logger.info("hello");
    ws.on('message',function incoming(message) {
        let m = JSON.parse(message);
        //HEART_BEAT
        if (m.purpose === "HEART_BEAT") {
            logger.info(wss.clients.size);
            //logger.info(m);
            ws.send(JSON.stringify({
                purpose: "HEART_BEAT"
            }));
            if (socketControl[m.payload]) {
                clearTimeout(socketControl[m.payload]);
            }
            let tm = setTimeout(()=> {
                logger.info("delete " + m.payload);
                userList[m.payload].terminate();
                delete userList[m.payload];
                Object.values(userList).forEach((client)=> {
                client.send(JSON.stringify({
                    purpose: "SOCKET_INIT_CONTACT",
                    payload: Object.keys(userList)
                }));
            });
                delete socketControl[m.payload];
            },10000);
            socketControl[m.payload] = tm;
        }
        // SOCKET_ADD_USER
        if (m.purpose === "CLIENT_ADD_USER") {

            //add one user

            // send all the online users
            userList[m.payload] = ws;
            Object.values(userList).forEach((client)=> {
                client.send(JSON.stringify({
                    purpose: "SOCKET_INIT_CONTACTS",
                    payload: Object.keys(userList)
                }));
            });

            logger.info(Object.keys(userList));
        }
        if (m.purpose === "CLIENT_SEND_MESSAGE") {
            logger.info(m);
            let message = m.payload;
            let receiver = message.receiver;
            if(userList[receiver]) {
                userList[receiver].send(JSON.stringify({
                    purpose: "SOCKET_SEND_MESSAGE",
                    payload: message
                }));
            }
        }
    });
});


server.listen(process.env.PORT, () => {
    logger.info(`Server is listening on PORT ${process.env.PORT}`);
});

