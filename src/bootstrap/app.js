
const express = require('express')
const config = require('../cfg')
const app = express()
const bodyParser = require('body-parser')
const log = require('./logger')
const minions = require('../minions')

// Set config
app.set('config', config)
app.set('log', log)

app.use(bodyParser.json())

// Init core modules
app.set('minions', minions(config))

// Load routes
require('../web/routes')(app)

// Handle 404
app.use((req, res) => {
  log.warn('404', {
    method: req.method,
    url: req.url,
    query: req.query,
    ip: req.ip
  })

  const { formatPayload } = req.app.get('minions').transformResponse

  const payload = formatPayload({
    status: 404,
    errors: [
      {
        field: 'Page',
        message: 'Page not found'
      }
    ]
  })

  res.status(payload.status).json(payload)
})

// Handle 500 errors
app.use((err, req, res, next) => {
  if (!err) {
    return next()
  }

  log.error('500', {
    method: req.method,
    url: req.url,
    query: req.query,
    ip: req.ip,
    err
  })

  const { formatPayload } = req.app.get('minions').transformResponse

  const payload = formatPayload({
    status: 500,
    errors: [
      {
        field: 'Page',
        message: 'Internal server error. Something broke!'
      }
    ]
  })

  res.status(payload.status).json(payload)
})

app.listen(app.get('config').web.port)
log.info('Listening on port %s', app.get('config').web.port)
log.info({ url: 'http://localhost:8080/api/v1/search' }, 'Api url')
