const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const server = express();
const messages = [];

server.use(cors())
const app = server.listen(PORT, () => console.log(`Listening on ${PORT}`));


server.get('/messages', (req, res) => {
  console.log(req);
  res.send(messages);
});


const io = socketIO(app);

io.on('connection', (socket) => {
  socket.on('disconnect', () => {});

  socket.on('send-message', (message) => {
    const m = {
      text: message.text,
      name: message.name,
      leagueId: message.leagueId,
      timestamp: message.timestamp
    }
    messages.push(m);
    io.emit('new-message', m);
  });
});