const { EventEmitter } = require('events');

class FakeStepCounter extends EventEmitter {
  constructor() {
    super();
    this.stepCount = 0;
    this.on('steps', function stepCounter(steps) {
      this.stepCount += steps;
      console.log({ stepCount: this.stepCount });
    });
  }

  static factory() {
    const stepCounter = new FakeStepCounter();
    // Start counting fake steps every 2 seconds
    setInterval(() => {
      const steps = Math.floor(Math.random() * 10);
      stepCounter.emit('steps', steps);
    }, 2000);
    return stepCounter;

  }
}

module.exports = FakeStepCounter;
