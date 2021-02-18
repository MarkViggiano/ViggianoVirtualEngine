class Logger {
  constructor(name) {
    this.name = name;
  }

  log(name, whatToLog) {
    if (name === null || name === undefined) console.log(`[${this.name}] ${whatToLog}`);
    else console.log(`[${this.name}] [${name}] ${whatToLog}`);
  }

}

module.exports = Logger;
