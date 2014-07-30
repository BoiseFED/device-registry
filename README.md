device-registry
===============

### Instructions
Install mongo
`brew install mongo`

Run mongo in a terminal
`mongod`

Fix any issues like permissions and missing folders based on `mongod` output.

create a `config.json` file with the format of
```
{
  "uri": "mongodb://localhost:27017/ag_devicedb"
}
```
to connect to your mongo instance

DONT CHECK THE `config.json` IN!

install npm packages
`npm install`

install bower packages
`bower install`

run grunt to start server
`grunt dev`
