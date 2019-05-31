const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.port || 4000;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log("Listening on port", port);
});

const io = socket(server)

io.on('connection', (socket) => {
  console.log('Socket connection made! ', socket.id);
  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })
})