const express = require('express');
const router = express.Router();

router.get("/get/:songName?", function (req, res) {
  let songName = req.params.songName;
  res.send(`Song is: ${songName}`);
})

module.exports = router;
