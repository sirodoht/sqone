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

tester.teardown = function(done) {
  return redisService
    .connection()
    .keys('sqoneTest:*')
    .map(key => {
      return redisService.connection().del(key.split(':')[1]);
    })
    .then(() => {
      return redisService.disconnect();
    })
    .then(() => {
      server.close(() => {
        done();
      });
    });
};

module.exports = tester;
