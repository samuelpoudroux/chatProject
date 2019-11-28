const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db/db');
var cors = require('cors');
const pjson = require('../package.json');
const apiRouter = require('./routes/api');

var stripe = require('stripe')(pjson.stripeSecretKey);

mongoose.connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);


const app = express();
app.use(passport.initialize());
require('./passport')(passport);
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("body-parser").text());

app.use('/api', apiRouter);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});