const { EventEmitter } = require('events');

class FakeStepCounter extends EventEmitter {
  constructor() {
    super();
    this.stepCount = 0;
  }
}

const fakeStepCounter = new FakeStepCounter();

fakeStepCounter.on('steps', function stepCounter(steps) {
  this.stepCount += steps;
  console.log({ stepCount: this.stepCount });
});

setInterval(() => {
  const steps = Math.floor(Math.random() * 10);
  fakeStepCounter.emit('steps', steps);
}, 2000);

module.exports = fakeStepCounter;
