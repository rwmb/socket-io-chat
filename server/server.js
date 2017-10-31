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
  
  socket.on('createMessage', (newMessage) => {
    console.log(`${newMessage.from}: ${newMessage.text}`);
    let newMessageObj = {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    };
    // socket.emit('newMessage', newMessageObj);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});