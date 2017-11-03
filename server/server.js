const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const { generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected\n');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room Name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // socket.leave()
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    // io.emit -> io.to(room name).emit
    // socket.broadcast.emit -> socket.broadcast.to(room name).emit
    // socket.emit
    callback();
  });

  socket.on('createMessage', (newMessage, callback) => {
    console.log(`${newMessage.from}: ${newMessage.text}`); // log message

    //socket.broadcast.emit('newMessage', newMessage); // send to everyone but who sent the message
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text)); // send to everyone
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});