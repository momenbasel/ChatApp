var socket = io();
socket.on('connect', function() {
  console.log('connected to slave1');
});

socket.on('disconnect', function() {
  console.log('disconnected from slave1');
});



socket.on('newMessage', function(msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  console.log('newMessage', msg);
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from:msg.from,
    url:msg.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});



jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTexbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from:'User',
    text:messageTexbox.val()
  }, function(){
    messageTexbox.val('');
  });
});


var locationButton = jQuery('#send-location');


locationButton.on('click', function() {

  if(!navigator.geolocation) {
    return alert('geolocation is\'nt found');
  }
  locationButton.attr('disabled','disabled').text('Sending location ...');
  navigator.geolocation.getCurrentPosition(function(res) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: res.coords.latitude,
      longitude: res.coords.longitude
    });

  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to get your location');
  })
});
