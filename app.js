const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from my Node.js demo app! This was deployed using a CI/CD pipeline.');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
