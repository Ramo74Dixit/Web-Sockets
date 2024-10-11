const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import cors

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for testing purposes
    methods: ['GET', 'POST'],
  },
});

// Use the CORS middleware
app.use(cors());

// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('WebSocket Server is Running');
});

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages
  socket.on('chatMessage', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all clients
    io.emit('chatMessage', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
