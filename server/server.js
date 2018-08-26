const path = require("path");
const http = require('http');
var moment = require('moment');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public'); // init public path
console.log(publicPath);
// init express
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log(`someone listend to slave`);

  socket.emit('newMessage', {
    from:'Admin',
    text:'Welcome to Chat App ',
    createdAt: moment().valueOf()
  });
  socket.broadcast.emit('newMessage', {
    from:'Admin',
    text:'New user joined',
    createdAt: moment().valueOf()
  });


  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', {
      from:message.from,
      text:message.text,
      createdAt: moment().valueOf()
    });
    callback();
  });


socket.on('createLocationMessage', (coords) => {
  io.emit('newLocationMessage', generateLocationMessage('admin',coords.latitude,coords.longitude));
});

});

server.listen(port, () => {
  console.log(`serving at ${port}`);
});
