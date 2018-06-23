const dotenv = require('dotenv')
dotenv.config({
  path: './.env.local'
})
dotenv.config()
require = require('esm')(module) //eslint-disable-line
module.exports = require('./src/app.js')
