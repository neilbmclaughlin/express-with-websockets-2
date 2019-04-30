const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const handler = (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading ${__dirname}/index.html`);
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
};


const server = http.createServer(handler);
const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
  setInterval(() => {
    const timestamp = Date.now();
    console.log('Emitted: ' + timestamp);
    socket.emit('timer', timestamp);
  }, 2000);
  socket.on('submit', (data) => {
    console.log('Submitted: ' + data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

