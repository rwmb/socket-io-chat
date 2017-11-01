
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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {
    
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  
  navigator.geolocation.getCurrentPosition(function (position) {
   socket.emit('createLocationMessage', {
     latitude: position.coords.latitude,
     longitude: position.coords.longitude
   });
  }, function (err) {
    alert('unable to fetch location');
  });
});