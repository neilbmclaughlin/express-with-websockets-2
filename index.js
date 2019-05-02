const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');
const stepCounter = require('./fakeStepCounter');

const hostname = '127.0.0.1';
const port = 3000;

const handler = (req, res) => {
  if (req.url === '/rtc') {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading ${__dirname}/index.html`);
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  } else {
    res.writeHead(200);
    res.end(stepCounter.stepCount.toString());
  }
};

const server = http.createServer(handler);
const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
  stepCounter.on('steps', () => {
    socket.emit('steps', stepCounter.stepCount);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
