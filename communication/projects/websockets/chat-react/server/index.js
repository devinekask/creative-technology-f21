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
    let messageObj = { msg: message, id: socket.id }
    console.log('message received', messageObj.msg, 'from', messageObj.id);
    io.sockets.emit(`message`, messageObj,);
  });

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});