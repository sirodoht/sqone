const Redis = require('ioredis');

const redisService = {};

let connection = null;

redisService.connect = function(namespaceKey = 'sqone:') {
  connection = new Redis(process.env.REDIS_URL, {keyPrefix: namespaceKey});
};

redisService.disconnect = function() {
  return connection.disconnect();
};

redisService.connection = function() {
  return connection;
};

module.exports = redisService;
