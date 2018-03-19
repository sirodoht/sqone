const debug = require('debug')('sqone:server');

const redisService = require('../services/redis');

const indexCtrl = {};

indexCtrl.dashboard = function(req, res) {
  const items = [];

  redisService
    .connection()
    .keys('sqone:*')
    .map(key => {
      return redisService
        .connection()
        .get(key.split(':')[1])
        .then(value => {
          items.push({
            key: key.split(':')[1],
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
};

indexCtrl.count = function(req, res) {
  const options = {
    root: __dirname + '/../public/images/',
  };
  const keyName = req.params.id;

  if (keyName.includes(':')) {
    throw new Error('Invalid url path.');
  }

  redisService
    .connection()
    .get(keyName)
    .then(result => {
      let newValue = 1;
      if (result) {
        newValue = parseInt(result) + 1;
      }
      return newValue;
    })
    .then(newValue => {
      return redisService.connection().set(keyName, newValue);
    })
    .then(() => {
      return res.sendFile('transparent-pixel.png', options, err => {
        if (err) {
          next(err);
        } else {
          debug('Key name saved:', keyName);
        }
      });
    })
    .catch(err => {
      throw err;
    });
};

module.exports = indexCtrl;
