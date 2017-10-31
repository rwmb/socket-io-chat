
var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
  
  socket.emit('createMessage', {
    from: 'Richard',
    text: 'Hey. This is Richard.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  let date = new Date(message.createdAt);
  dateString = date.getDate() + 
    '/' + date.getMonth() + 
    '/' + date.getFullYear() +
    ' ' + date.getHours() +
    ':' + date.getMinutes()
  console.log(dateString + ' - ' + 
    message.from + ': ' + 
    message.text);
});
