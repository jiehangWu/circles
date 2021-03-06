const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

require('dotenv').config();
// Make sure models are required
require('./model/User');
require('./model/Chat');
require('./model/Message');
require('./model/Post');
require('./model/Comment');

const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = "OFF";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
app.use(cors({
    origin: ['http://localhost:3000', 'https://circles-ubc.azurewebsites.net'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const awsRoutes = require('./routes/awsRoutes');
const geoRoutes = require('./routes/geoRoutes');
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');
const searchRoutes = require('./routes/searchRoutes');
const socketFunction = require('./websocket/socketFunction');


const MAX_AGE = 60 * 60 * 1000;
app.use(session({
    name: 'circles',
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: MAX_AGE
    }
}));

app.use('/', authRoutes);
app.use('/aws', awsRoutes);
app.use('/post', postRoutes);
app.use('/chat', chatRoutes);
app.use('/search', searchRoutes);
app.use('/geolocation', geoRoutes);

wss.on('connection', socketFunction);

server.listen(process.env.PORT, () => {
    logger.info(`Server is listening on PORT ${process.env.PORT}`);
});


