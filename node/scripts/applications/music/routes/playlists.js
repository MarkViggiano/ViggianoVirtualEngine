const express = require('express');
const router = express.Router();

router.get("/get/:playlistName?", function (req, res) {
  let playlistName = req.params.playlistName;
  res.send(`Playlist is: ${playlistName}`);
})

module.exports = router;
