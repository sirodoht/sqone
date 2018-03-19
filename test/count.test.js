const request = require('supertest');

const tester = require('./tester');

let app = null;

describe('count test', () => {
  beforeAll(() => {
    app = tester.setup();
  });

  afterAll(done => {
    return tester.teardown(done);
  });

  test('get 200 on count', () => {
    return request(app)
      .get('/ironman')
      .expect(200);
  });
});
