
const _ = require('lodash')
const minions = [
  'transformResponse',
  'yelp'
]

function init (cfg) {
  const payload = {}

  _.forEach(minions, (minion) => {
    payload[minion] = require('./' + minion)(cfg)
  })

  return payload
}

module.exports = init
