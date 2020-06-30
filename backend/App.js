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
const wss = new WebSocket.Server({ server });

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
const authRoutes = require('./routes/authRoutes');
const awsRoutes = require('./routes/awsRoutes');

const MAX_AGE = 15 * 60 * 1000;
app.use(session({
    name: 'circles',
    resave: false,
    saveUninitialized: false,
    secret: keys.COOKIE_SECRET,
    cookie: {
        domain: "localhost",
        maxAge: MAX_AGE,
    }
  }));

app.use('/', authRoutes);
app.use('/aws', awsRoutes);

wss.on('connection', (ws) => {
    logger.info('WebSocket is connected...');
});

server.listen(process.env.PORT, () => {
    logger.info(`Server is listening on PORT ${process.env.PORT}`);
});
