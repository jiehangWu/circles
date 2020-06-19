const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./secrets/Keys')
const bodyParser = require('body-parser');
// Make sure this is required
require("./model/User");

const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'info';

// The ordering is important too
const app = express();
mongoose.connect(keys.MONGOURI_LOCAL, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const router = require('./routes/router');

const MAX_AGE = 15 * 60 * 1000;
app.use(session({
    name: 'circles',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        maxAge: MAX_AGE,
    }
  }));

app.use('/', router);

const PORT = 5000;
app.listen(PORT, () => {
    logger.info(`Server is listening on PORT ${PORT}`);
});
   