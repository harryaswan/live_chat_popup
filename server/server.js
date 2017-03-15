var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat_message', function (msg) {
    console.log(msg);
    io.emit('chat_message', msg);
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
