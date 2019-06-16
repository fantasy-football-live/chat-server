const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const server = express();

///database
const Chats = require('./Models/Chat');
const connect = require('./databaseConnection');

//server config
server.use(cors())
const app = server.listen(PORT, () => console.log(`Listening on ${PORT}`));

//socket connection
const io = socketIO(app);


server.get('/messages', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200;
  connect.then(db => {
    Chats.find({}).then(chat => {
      res.json(chat);
    })
  }).catch(err => console.log(err));
});



io.on('connection', (socket) => {
  socket.on('disconnect', () => {});

  socket.on('send-message', (message) => {
    const m = {
      text: message.text,
      name: message.name,
      leagueId: message.leagueId,
      timestamp: message.timestamp
    }

    connect.then(db => {
      let chatMessage = new Chats({
        message: m.text,
        sender: message.name
      });
      chatMessage.save();

      io.emit('new-message', chatMessage);
    }).catch(err => console.log(err));



  });
});