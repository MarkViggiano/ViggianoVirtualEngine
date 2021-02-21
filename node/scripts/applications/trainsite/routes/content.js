const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('pages/index');
});

router.get('/rollingstock', function(req, res) {
  res.render('pages/rollingstock');
});

router.get('/trains', function(req, res) {
  res.send("trains.....");
})

module.exports = router;
