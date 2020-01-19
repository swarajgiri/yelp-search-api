const express = require('express')
const router = express.Router()

router.get('/search', async (req, res, next) => {
  const minions = req.app.get('minions')
  const { yelp } = minions
  const { formatPayload } = minions.transformResponse

  try {
    const response = await yelp.search({
      location: 'Alpharetta',
      term: 'ice cream shops',
      categories: ['icecream'],
      sortBy: 'rating',
      limit: 5
    })

    const payload = formatPayload({ data: response })

    res.status(payload.status).json(payload)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
