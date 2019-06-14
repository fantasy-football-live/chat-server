var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log("user connected")
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  socket.on('send-message', function (message) {
    io.emit('new-message', {
      text: message.text,
      created: new Date()
    })
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
