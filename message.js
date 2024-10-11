const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);  // Create an HTTP server
const io = new Server(server);  // Bind WebSocket to HTTP server

// Listening for a new connection from clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listening for messages from the client
  socket.on('message', (msg) => {
    console.log('Message received: ', msg);
    io.emit('message', msg);  // Broadcast the message to all connected clients
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});