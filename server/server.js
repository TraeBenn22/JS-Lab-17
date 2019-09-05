'use strict';

const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('connected', socket.id);

  socket.on('file-save', (payload) => {
    io.emit('message', payload);
  });

  socket.on('file-error', (payload) => {
    io.emit('message', payload);
  });
});
