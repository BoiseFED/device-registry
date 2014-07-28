var fs = require('fs');
module.exports = {
  locations: JSON.parse(fs.readFileSync(__dirname + '/locations.json')),
  os: JSON.parse(fs.readFileSync(__dirname + '/os.json')),
  authors: JSON.parse(fs.readFileSync(__dirname + '/authors.json'))
};
