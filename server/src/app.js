const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db/db');
var cors = require('cors');
const apiRouter = require('./routes/api');
const { addUser, removeUser, getUser, getUsersInRoom, allUsers } = require('./users/users');
const { addRooms } = require('./rooms/rooms.js')

mongoose.connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);
require('./passport')(passport);
app.use(passport.initialize());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("body-parser").text());
app.use('/api', apiRouter);

io.on('connect', (socket) => {
  // const toto =  allUsers();
  // console.log("join user",toto)
  // io.emit('toto', toto);

  socket.on('join',({ name, room }, callback) => {
    const { userError, user } = addUser({id: socket.id, name, room });
    if(userError) return callback(userError);
    socket.join(user.room);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: ` l'utilisateur ${user.name} has joined!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('rooms', (rooms) => {
    const { roomsArray } = addRooms(rooms);
    io.emit('rooms', roomsArray)
  })

  socket.on('getAllUser', (rooms) => {
    const users = allUsers();
    console.log("rooms", users)
    io.emit('users', users);
  })
  
  socket.on('disconnect', ()=> {
    console.log('disconnect')
    console.log('socketID',socket.id)
    const userToRemove = removeUser(socket.id);
    if(userToRemove) {
      console.log('disconnect', userToRemove)
      const users = allUsers();
      console.log('alluserafterdiconnect', users)
      io.emit('users', users);
      io.to(userToRemove.room).emit('message', { user: 'Admin', text: `${userToRemove.name} has left.` });
      io.to(userToRemove.room).emit('roomData', { room: userToRemove.room, users: getUsersInRoom(userToRemove.room)});
    };
  })
});

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});