class Test {
  constructor(port, db, logger) {
    this.express = require('express');
    this.app = this.express();

    this.logger = logger;
    this.db = db;
    this.port = port;
  }

  async start() {

    this.app.get("/", function (req, res) {
      res.send("Test");
    })

    this.app.listen(this.port);
  }

}

module.exports = Test;
