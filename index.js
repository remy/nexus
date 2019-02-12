const request = require('request');
const express = require('express');
const app = express();

app.use('/api', require('./lib/api'));

const server = app.listen(process.env.PORT || 3000, details => {
  console.log(`listening http://localhost:${server.address().port}`);
});
