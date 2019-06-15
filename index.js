const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const server = express()
  .use(cors())
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  socket.on('send-message', function (message) {
    io.emit('new-message', {
      text: message.text,
      name: message.name,
      leagueId: message.leagueId,
      timestamp: message.timestamp
    })

    console.log(message);
  })
});