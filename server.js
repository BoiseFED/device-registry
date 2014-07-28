var express = require('express'),
  restful = require('node-restful'),
  mongoose = restful.mongoose,
  _ = require('underscore'),
  logger = require('morgan'),
  fs = require('fs'),
  app = express(),
  res = require('./res');
  //locations = JSON.parse(fs.readFileSync('res/locations.json', 'utf8'));

var skip = function(req, res) {
  if(req.url != '/')
    return true;
  return false;
}

var logOptions = {
  skip: skip
}

app.use(logger('tiny', logOptions));
app.use(express.static(__dirname + '/public'));
app.use(express.query());

var dbOptions = JSON.parse(fs.readFileSync('config.json', 'utf8'));
mongoose.connect("mongodb://@ds027779.mongolab.com:27779/ag_devicedb", dbOptions);

var locations = {
  values: res.locations.values,
  message: res.locations.message
}

var Device = app.device = restful.model('device', mongoose.Schema({
  location: {type: 'string', enum: locations, required: true},
  os: {type: 'string', required: true},
  version: {type: 'string', required: true},
  comments:[{
      body: {type: 'string'},
      date: {type: 'Date'}
  }]
}))
.methods(['get', 'post', 'put', 'delete']);

//var History = app.history = restful.model('device', mongoose.Schema({
//}))

Device.register(app, '/api/devices');

app.listen(process.env.PORT || 8000);
