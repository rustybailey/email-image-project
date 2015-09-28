var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:email', function(req, res) {
  res.send('this will be an image');
});

module.exports = router;
