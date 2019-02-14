require('@remy/envy');
const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', '1990s technology, and unicorns, obviously');
  next();
});
app.use('/api', require('./lib/api'));
app.use('/', express.static('./app'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`listening http://localhost:${server.address().port}`);
});
