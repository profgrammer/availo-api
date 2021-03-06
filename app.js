const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const productsHandler = require('./api/routes/products');
const ordersHandler = require('./api/routes/orders');
const officerHandler = require('./api/routes/officers');
const adminHandler = require('./api/routes/admin');
const coordsHandler = require('./api/routes/coords');
const algosHandler = require('./api/routes/algos');
const calendarHandler = require('./api/routes/calendar');
const searchHandler = require('./api/routes/search');

const mongoose = require('mongoose');

// app.use(express.static(path.join(__dirname, 'api', 'nlu')));
app.use(morgan('dev'));
mongoose.connect("mongodb://availo:" + process.env.MONGO_ATLAS_PASSWORD + "@availocluster-shard-00-00-ofjdo.mongodb.net:27017,availocluster-shard-00-01-ofjdo.mongodb.net:27017,availocluster-shard-00-02-ofjdo.mongodb.net:27017/test?ssl=true&replicaSet=AvailOCluster-shard-0&authSource=admin&retryWrites=true",  { useNewUrlParser: true })
.catch(e => {
  console.log('error.', e)
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/officers', officerHandler);
app.use('/products', productsHandler);
app.use('/orders', ordersHandler);
app.use('/admin', adminHandler);
app.use('/coords', coordsHandler);
app.use('/algos', algosHandler);
app.use('/calendar', calendarHandler);
app.use('/search', searchHandler);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
