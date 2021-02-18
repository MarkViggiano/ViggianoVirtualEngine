class Music {
  constructor(port, db, logger) {
    this.express = require('express');
    this.app = this.express();

    this.logger = logger;
    this.db = db;
    this.port = port;

    //routes
    this.songs = require("./routes/songs.js");
    this.playlists = require("./routes/playlists.js");
  }

  async start() {

    this.app.use(this.express.static(__dirname + '/public'));

    this.app.get("/", function (req, res) {
      res.send("Music App");
    })

    this.app.use("/songs/", this.songs);
    this.app.use("/playlists", this.playlists);

    this.app.listen(this.port, () => {
      this.db.query("CREATE TABLE IF NOT EXISTS songs(name VARCHAR(255), playlist VARCHAR(255))", function (error, result) {if (error) throw error;})
      this.logger.log("Music", "Connected to the Songs Table!");
    });
  }

}

module.exports = Music;
