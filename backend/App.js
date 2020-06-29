const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./secrets/Keys')
const bodyParser = require('body-parser');
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

app.listen(process.env.PORT, () => {
    logger.info(`Server is listening on PORT ${process.env.PORT}`);
});
   