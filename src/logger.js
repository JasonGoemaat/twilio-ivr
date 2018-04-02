const FS = require('fs');
const PATH = require('path');

const DATA_PATH = PATH.resolve('.data');
const HISTORY_PATH = PATH.join(DATA_PATH, 'history.json');

if (!FS.existsSync(DATA_PATH)) {
  FS.mkdirSync(DATA_PATH);
}

let history = [];
if (FS.existsSync(HISTORY_PATH)) {
  history = JSON.parse(FS.readFileSync(HISTORY_PATH, 'utf8'));
}

class Logger {
  constructor() {
    this.history = history;
  }
  
  add(req) {
    let item = {
      _startTime: req.startTime,
      body: req.body,
      originalUrl: req.originalUrl
    }

    this.history.unshift(item);
    if (this.history.length > 50) {
      this.history.pop();
    }
    FS.writeFileSync(HISTORY_PATH, JSON.stringify(this.history, null, 2), 'utf8');
  }
}

let logger = new Logger();

module.exports = logger;
