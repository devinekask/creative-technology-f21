const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  // console.log('Socket connected', socket.id);

  socket.on('message', message => {
    console.log('message received', message);
    io.sockets.emit(`message`, message);
  });

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});