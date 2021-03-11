class Music {
  constructor(port, db, logger) {
    this.express = require('express');
    this.app = this.express();

    this.logger = logger;
    this.db = db;
    this.port = port;

  }

  async start() {

    this.app.use(this.express.static(__dirname + '/public'));

    this.app.get("/", function (req, res) {
      res.sendFile(__dirname + "/pages/index.html");
    })

    this.app.use("/songs/", function (req, res) {
      this.db.query("SELECT * FROM songs", function (error, result) {
        if (error) throw error;
        res.send(result);
      })
    });

    this.app.use("/playlists/", function (req, res) {
      this.db.query("SELECT * FROM playlists", function (error, result) {
        if (error) throw error;
        res.send(result);
      })
    });

    this.app.listen(this.port, () => {
      this.db.query("CREATE TABLE IF NOT EXISTS songs(name VARCHAR(255), playlist VARCHAR(255), author VARCHAR(255))", function (error, result) {
        if (error) throw error;
      });

      this.logger.log("Music", "Connected to the Songs Table!");

      this.db.query("CREATE TABLE IF NOT EXISTS playlists (name VARCHAR(255), image VARCHAR(255))", function (error, result) {
        if (error) throw error;
      });

      this.logger.log("Music", "Connected to the Playlists Table!");

    });
  }

}

module.exports = Music;
