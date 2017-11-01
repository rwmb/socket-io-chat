
var socket = io();
var format = function (message) {
  let date = new Date(message.createdAt);
  dateString = date.getDate() + 
    '/' + date.getMonth() + 
    '/' + date.getFullYear() +
    ' ' + date.getHours() +
    ':' + date.getMinutes();
  return `${dateString} - ${message.from}: ${message.text}`;
};

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var li = $('<li></li>');
  li.text(format(message));
  
  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {
    
  });
});