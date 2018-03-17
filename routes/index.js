const express = require('express');
const router = express.Router();
const Redis = require('ioredis');

/* GET home page. */
router.get('/', (req, res) => {
  const redis = new Redis(process.env.REDIS_URL);

  const items = [];

  redis
    .keys('*')
    .map(key => {
      return redis.get(key).then(value => {
        items.push({
          key,
          value,
        });
      });
    })
    .then(() => {
      res.render('index', {
        items,
      });
    })
    .catch(err => {
      throw err;
    });
});

/* GET unique image. */
router.get('/:id', (req, res) => {
  const redis = new Redis(process.env.REDIS_URL);

  const options = {
    root: __dirname + '/../public/images/',
  };
  const keyName = req.params.id;

  redis
    .get(keyName)
    .then(result => {
      let newValue = 1;
      if (result) {
        newValue = parseInt(result) + 1;
      }
      return newValue;
    })
    .then(newValue => {
      return redis.set(keyName, newValue);
    })
    .then(() => {
      return res.sendFile('transparent-pixel.png', options, err => {
        if (err) {
          next(err);
        } else {
          console.log('Key name saved:', keyName);
        }
      });
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
