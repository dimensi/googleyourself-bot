const fs = require('fs')
const dotenv = require('dotenv')
dotenv.load()
const envConfig = dotenv.parse(fs.readFileSync('.env.local'))
for (var k in envConfig) {
  process.env[k] = envConfig[k]
}
require = require('esm')(module) //eslint-disable-line
module.exports = require('./src/app.js')
