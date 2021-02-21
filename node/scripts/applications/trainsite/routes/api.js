const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send("API is up and alive!");
});

router.get('/trains', function (req, res) {
  res.send("trains go here!");
})

module.exports = router;
