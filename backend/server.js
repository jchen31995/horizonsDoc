// express server
const express = require('express')
const app = express()

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// mongodb
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const { User } = require('../models/models');

// passport
var passport = require('./passportConfig');
var session = require('express-session');
var auth = require('./auth');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    name: 'some cookie',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', auth(passport));
app.use((req, res, next) => {
  if (!req.user && req.method !== 'OPTIONS') {
    return res.format({
      // 'text/html': () => res.redirect('/login'),
      'application/json': () => res.json({ response: 'You are not logged in' })
    });
  }
  return next();
});

// routes
var routes = require('./routes');
app.use('/', routes);

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
});
