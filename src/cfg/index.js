
const _ = require('lodash')
const env = process.env.NODE_ENV || 'development'

const cfg = {
  appname: 'yelp-search-api',
  web: {
    port: process.env.PORT
  },
  yelp: {
    apiKey: process.env.YELP_API_KEY
  },
  baseUrl: `http://localhost:${process.env.PORT}/api/v1`
}

module.exports = _.merge(cfg, require('./' + env))
