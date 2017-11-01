const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected\n');
  
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));
  
  socket.on('createMessage', (newMessage, callback) => {
    console.log(`${newMessage.from}: ${newMessage.text}`); // log message
    
    //socket.broadcast.emit('newMessage', newMessage); // send to everyone but who sent the message
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text)); // send to everyone
    callback('This is from the server.');
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});