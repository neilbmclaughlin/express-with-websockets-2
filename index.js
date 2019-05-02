const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const FakeStepCounter = require('./fakeStepCounter');

const stepCounter = new FakeStepCounter();

// Start counting fake steps every 2 seconds
setInterval(() => {
  const steps = Math.floor(Math.random() * 10);
  stepCounter.emit('steps', steps);
}, 2000);

const hostname = '127.0.0.1';
const port = 3000;

const handler = (req, res) => {
  if (req.url === '/rtc') {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading ${__dirname}/index.html`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ stepCount: stepCounter.stepCount }));
  }
};

const server = http.createServer(handler);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  stepCounter.on('steps', function socketSend() {
    ws.send(this.stepCount);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

