const request = require('supertest');

const tester = require('./tester');

let app = null;

beforeAll(() => {
  app = tester.setup();
});

afterAll(() => {
  tester.teardown();
});

test('get 200 on dashboard', () => {
  return request(app)
    .get('/')
    .expect(200);
});

test('get item on dashboard', () => {
  return request(app)
    .get('/spiderman')
    .expect(200)
    .then(() => {
      return request(app)
        .get('/')
        .expect(200)
        .then(res => {
          res.text.includes('spiderman');
          res.text.includes('1');
        });
    });
});
