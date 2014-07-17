var express = require('express'),
  restful = require('node-restful'),
  mongoose = restful.mongoose,
  _ = require('underscore'),
  logger = require('morgan'),
  fs = require('fs'),
  app = express();

var skip = function(req, res) {
  if(req.url != '/')
    return true;
  return false;
}

var logOptions = {
  format: 'tiny',
  skip: skip
}

app.use(logger(logOptions));
app.use(express.static(__dirname + '/public'));
app.use(express.query());

var dbOptions = JSON.parse(fs.readFileSync('config.json', 'utf8'));
mongoose.connect("mongodb://@ds027779.mongolab.com:27779/ag_devicedb", dbOptions);

var Device = app.device = restful.model('device', mongoose.Schema({
  location: 'string',
  os: 'string',
  version: 'string'
}))
.methods(['get', 'post', 'put', 'delete']);

Device.register(app, '/api/devices');

app.listen(process.env.PORT || 8082);
