class TrainSite {
  constructor(port, db, logger) {

    //dependencies
    this.express = require('express');
    this.app = this.express();
    this.ejs = require('ejs');
    this.cookieParser = require('cookie-parser');
    this.path = require('path');

    //parameters
    this.logger = logger;
    this.db = db;
    this.port = port;

    //Routing
    this.content = require("./routes/content");
    this.api = require("./routes/api");
  }

  async start() {
    this.app.enable('verbose errors');
    require('events').EventEmitter.defaultMaxListeners = 0;
    this.app.set('views', this.path.join(__dirname, './views'));
    this.app.set('view engine', 'ejs');
    this.app.use(this.express.static(__dirname + '/public'));
    this.app.use(this.cookieParser());

    // Parse URL-encoded bodies (as sent by HTML forms)
    this.app.use(this.express.urlencoded({extended: true}));
    this.app.use(this.express.json());

    //routes
    this.app.use('/', this.content);
    this.app.use('/api', this.api);

    this.app.listen(this.port);
  }

}

module.exports = TrainSite;
