const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db/db');
var cors = require('cors');
const apiRouter = require('./routes/api');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  allUsers,
  userByName,
  checkUserAvaibility
} = require('./users/users');
const {
  addRooms,
} = require('./rooms/rooms.js')

mongoose.connect(config.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(
  () => {
    console.log('Database is connected')
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
);
require('./passport')(passport);
app.use(passport.initialize());
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(require("body-parser").text());
app.use('/api', apiRouter);

io.on('connect', (socket) => {

  socket.on('beforeJoin', ({
    name,
    room
  }, callback) => {
    const {
      userError, 
      isAvailable
    } = checkUserAvaibility({
      name,
      room
    });

    if (userError)  {
      return callback(userError)
    }

    if(isAvailable) {
      return callback(isAvailable)
    }
  })

  socket.on('join', ({
    name,
    room
  }, callback) => {
    const {
      userError,
      user
    } = addUser({
      id: socket.id,
      name,
      room
    });
    if (userError) return callback(userError);
    socket.join(user.room);
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, Bienvenue sur le salon ${user.room}.`
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: ` l'utilisateur ${user.name} à rejoint le chat!`
    });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {
      user: user.name,
      text: message
    });
    callback();
  });

  socket.on('rooms', (rooms) => {
    const {
      roomsArray
    } = addRooms(rooms);
    io.emit('rooms', roomsArray)
  })


  socket.on('getAllUser', (rooms) => {
    const users = allUsers();
    io.emit('users', users);
  })

  socket.on('userByName', (name) => {
    const users = userByName(name);
    io.emit('userByName', users);
  })

  socket.on('disconnect', () => {
    const userToRemove = removeUser(socket.id);
    if (userToRemove) {
      const users = allUsers();
      io.emit('users', users);
      io.to(userToRemove.room).emit('message', {
        user: 'Admin',
        text: `${userToRemove.name} a quitté le chat.`
      });
      io.to(userToRemove.room).emit('roomData', {
        room: userToRemove.room,
        users: getUsersInRoom(userToRemove.room)
      });
    };
  })
});

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});