const http = require('http');
const io = require('socket.io').listen(3001);
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

io.sockets.on('connection', (socket) => {
  socket.emit('news', { news: 'hello world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
