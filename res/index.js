var fs = require('fs');
module.exports = {
  locations: JSON.parse(fs.readFileSync(__dirname + "/locations.json"))
}
