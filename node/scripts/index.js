//Constants
const express = require('express');
const app = express();
const mysql = require('mysql');
const fs = require('fs');
const Logger = require('./utils/logger.js');
const logger = new Logger("VVE");

//Utilities
const config = require("./config.json");
let db;

//Maps
const connections = new Map();

app.enable('verbose errors');
require('events').EventEmitter.defaultMaxListeners = 0;
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function(req, res) {
  res.send("Hit the homepage!");
});

app.get('/application/:applicationName?/*', function(req, res) {
  let applicationName = req.params.applicationName;
  if (applicationName == null || applicationName == undefined) return res.send("Invalid Application Name!");
  let applicationPort = connections.get(applicationName.toLowerCase());
  if (applicationPort == null || applicationPort == undefined) return res.send("Invalid Application Name!");
  if (req.params[0] == null || req.params[0] == undefined) res.writeHead(302, {Location: `http://localhost:${applicationPort}/`});
  else res.writeHead(302, {Location: `http://localhost:${applicationPort}/${req.params[0]}`});

  res.end();
});

function createDatabaseConnection() {
  db = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database
  });
  logger.log("Database", "Successfully connected to the database!");
}

function registerApplications() {
  let startTime = Date.now();
  fs.readdir("./node/scripts/applications/", async (e, applications) => { //use node/scripts/ because of the method of starting vve
    if (e) return logger.log("Application", `Failed to load directories: ${e}`);
    if (!applications) return logger.log("Application", "Applications directory missing!");

    let count = 1;
    for (const application of applications) {
      let path = `applications/${application}`;
      let applicationConfig = require(`./${path}/config.json`);
      let name = applicationConfig.name;
      let port = 8000 + count;
      let ApplicationClass = require(`./${path}/${applicationConfig.srcFile}`);
      let newApplication = new ApplicationClass(port, db, logger);
      newApplication.start();

      connections.set(name.toLowerCase(), port);
      logger.log("Application", `Started Application: ${name} on Port: ${port}`);

      count++;
    }

    logger.log("Application", `Startup took approximately: ${Date.now() - startTime} ms`);

  })
}

app.listen(8000, () => {
  logger.log(null, "Started VVE on Port 8000");

  createDatabaseConnection();
  registerApplications();

});
