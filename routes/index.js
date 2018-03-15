const express = require('express');
const router = express.Router();
const Redis = require('ioredis');

/* GET home page. */
router.get('/', (req, res) => {
  const redis = new Redis({
    port: 6379,
    host: '127.0.0.1',
    db: 2,
  });

  const items = [];

  redis
    .keys('*')
    .map(key => {
      return redis.get(key).then(value => {
        console.log(key + ': ' + value);
        items.push(key + ': ' + value);
        console.log('does this run 6 times?');
      });
    })
    .then(() => {
      console.log('items:', items);
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
  const redis = new Redis({
    port: 6379,
    host: '127.0.0.1',
    db: 2,
  });

  const options = {
    root: __dirname + '/../public/images/',
  };
  const keyName = req.params.id;

  redis
    .get(keyName)
    .then(result => {
      console.log('result:', result);
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
      return res.sendFile('divider.png', options, err => {
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
