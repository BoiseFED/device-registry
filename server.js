var express = require('express'),
  restful = require('node-restful'),
  mongoose = restful.mongoose,
  _ = require('underscore'),
  logger = require('morgan'),
  fs = require('fs'),
  app = express(),
  resources = require('./res'),
  bodyParser = require('body-parser');
  //locations = JSON.parse(fs.readFileSync('res/locations.json', 'utf8'));

var skip = function (req, res) {
  if (req.url !== '/') {
    return true;
  }
  return false;
};

var logOptions = {
  skip: skip
};

app.use(logger('tiny', logOptions));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(express.query());

var dbOptions = JSON.parse(fs.readFileSync('config.json', 'utf8'));
mongoose.connect('mongodb://@ds027779.mongolab.com:27779/ag_devicedb', dbOptions);

var locations = {
  values: resources.locations.values,
  message: resources.locations.message
};

var os = {
  values: resources.os.values,
  message: resources.os.message
};

app.get('/resources/:resource', function (req, res) {
  if (resources[req.params.resource]) {
    res.json(resources[req.params.resource]);
  } else {
    res.status(404).send('Not Found: ' + req.params.resource);
  }
});

var Device = app.device = restful.model('device', mongoose.Schema({
    name: {type: 'string'},
    location: {type: 'string', enum: locations, required: true},
    os: {type: 'string', enum: os, required: true},
    version: {type: 'string', required: true},
    comments: [{
      body: {type: 'string'},
      author: {type: 'string'},
      date: {type: 'Date', default: Date.now}
    }]
  })
).methods(['get', 'post', 'put', 'delete']);

Device.register(app, '/api/devices');



app.listen(process.env.PORT || 8000);
