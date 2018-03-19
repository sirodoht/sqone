require('dotenv').config();

const http = require('http');

const app = require('../app');
const redisService = require('../services/redis');

const tester = {};

let server = null;

tester.setup = function() {
  server = http.createServer(app);
  redisService.connect('sqoneTest:');
  server.listen(3000);
  return app;
};

tester.teardown = function() {
  redisService
    .connection()
    .keys('sqoneTest:*')
    .map(key => {
      return redisService.connection().del(key.split(':')[1]);
    })
    .then(() => {
      redisService.disconnect();
      server.close();
    });
};

module.exports = tester;
