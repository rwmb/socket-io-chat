const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected\n');
  
  socket.emit('newMessage', {
    from: 'SERVER',
    text: 'You are connected!',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage', {
    from: 'SERVER',
    text: 'New user connected to the server!',
    createdAt: new Date().getTime()
  });
  
  socket.on('createMessage', (newMessage) => {
    console.log(`${newMessage.from}: ${newMessage.text}`);
    newMessage.createdAt = new Date().getTime();
    //socket.broadcast.emit('newMessage', newMessage); // send to everyone but who sent the message
    io.emit('newMessage', newMessage); // send to everyone
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});