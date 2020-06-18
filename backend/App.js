const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const keys = require('./secrets/Keys')
const bodyParser = require('body-parser');
// Make sure this is required
require("./model/User");

// The ordering is important too
const app = express();
mongoose.connect(keys.MONGOURI_LOCAL, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const router = require('./routes/router');

const MAX_AGE = 15 * 60 * 1000;
app.use(session({
    genid: (req) => {
        return uuid.v4();
    },
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
    console.log(`Server listening on PORT ${PORT}`);
});
   