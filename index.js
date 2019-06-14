var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');

const whitelist = ['http://localhost:8100'];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

io.on('connection', function (socket) {
  console.log("user connected")
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });


  socket.on('send-message', function (message) {
    io.emit('new-message', {
      text: message.text,
      created: new Date()
    })

    console.log(message);
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000');
});