const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.buf = 0;
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.buf += chunk.length;
    if (this.buf > this.limit){
      return callback(new LimitExceededError());
    }
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
