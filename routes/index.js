const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.set('Content-Length', 13945);
  res.set('Content-Type', 'image/png');
  next();
});

module.exports = router;
