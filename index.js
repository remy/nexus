const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: '50kb' }));

app.use('/api', require('./lib/api'));

const server = app.listen(process.env.PORT || 3000, details => {
  console.log(`listening http://localhost:${server.address().port}`);
});
