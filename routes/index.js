const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Well, hello there!');
});

/* GET unique image. */
router.get('/:id', (req, res) => {
  const options = {
    root: __dirname + '/../public/images/',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  res.sendFile('divider.png', options, err => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', req.url);
    }
  });
});

module.exports = router;
