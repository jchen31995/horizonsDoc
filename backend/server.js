// express server
const express = require('express');
const app = express();

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const { User } = require('../mongodb/models');

// passport
const passport = require('./passportConfig');
const session = require('express-session');
const auth = require('./auth');
const MongoStore = require('connect-mongo')(session);

//sockets
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

//sockets
io.on('connection', socket => {
  socket.on('join', ({doc}) => {
    console.log('join', doc);
    socket.emit('helloBack', { doc });

    socket.join(doc)
    socket.room = doc;
    socket.broadcast.to(doc).emit('userJoined');
  })

  socket.on('newContent', rawContent => {
    socket.broadcast.to(socket.room).emit('receiveContent', rawContent);
  })
})
// routes
const routes = require('./routes');
app.use('/', routes);

server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
});
