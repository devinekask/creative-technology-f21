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
  socket.on('message', message => {
    let messageObj = { msg: message[0], key: message[1]}
    console.log('message received', messageObj.msg, 'with timeStamp', messageObj.key);
    io.sockets.emit(`message`, messageObj,);
  });

});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});