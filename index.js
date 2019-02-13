require('@remy/envy');
const express = require('express');
const app = express();

app.use('/api', require('./lib/api'));
app.use('/', express.static('./app'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`listening http://localhost:${server.address().port}`);
});
