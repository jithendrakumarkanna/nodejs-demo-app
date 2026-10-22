const test = require('node:test');
const assert = require('node:assert');
const app = require('../app');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      baseUrl = `http://localhost:${server.address().port}`;
      resolve();
    });
  });
});

test.after(() => {
  server.close();
});

test('home route returns the hello message', async () => {
  const res = await fetch(baseUrl + '/');
  const body = await res.text();
  assert.strictEqual(res.status, 200);
  assert.ok(body.includes('Hello from my Node.js demo app'));
});

test('health route returns status ok', async () => {
  const res = await fetch(baseUrl + '/health');
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.status, 'ok');
});
