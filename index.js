const { createServer } = require('http');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const FakeStepCounter = require('./fakeStepCounter');

const stepCounter = FakeStepCounter.factory();

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ stepCount: stepCounter.stepCount }));
});

app.use(
  express.static(path.join(__dirname, '/public'), { extensions: ['html'] }),
);

const server = createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  stepCounter.on('steps', function socketSend() {
    ws.send(this.stepCount);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
