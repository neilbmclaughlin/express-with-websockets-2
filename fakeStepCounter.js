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
}

module.exports = FakeStepCounter;
