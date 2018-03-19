const request = require('supertest');

const tester = require('./tester');

let app = null;

beforeAll(() => {
  app = tester.setup();
});

afterAll(() => {
  tester.teardown();
});

test('get 200 on count', () => {
  return request(app)
    .get('/ironman')
    .expect(200);
});
