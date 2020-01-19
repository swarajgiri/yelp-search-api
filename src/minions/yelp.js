module.exports = (cfg) => {
  const yelp = require('yelp-fusion')
  const client = yelp.client(cfg.yelp.apiKey)
  const _ = require('lodash')

  const search = async ({ location = '', term = '', categories = [], sortBy = '', limit = 20 }) => {
    const searchResponse = await client.search({
      term,
      location,
      categories: categories.join(','),
      sort_by: sortBy,
      limit
    })

    const businesses = getBusinesses(searchResponse.jsonBody.businesses)

    const reviewResponse = await Promise.all(_.map(businesses, (business) => {
      return getReviewByBusinessId(business.id)
    }))

    const reviews = getReviews(reviewResponse)

    const payload = _.map(businesses, (business, index) => {
      return {
        ...business,
        reviews: reviews[index]
      }
    })

    return payload
  }

  function getBusinesses (businesses = []) {
    return _.map(businesses, (business) => {
      const { id, name, rating } = business

      return {
        id,
        name,
        rating,
        address: `${business.location.address1}, ${business.location.address2}, ${business.location.address3}, ${business.location.city}`
      }
    })
  }

  async function getReviewByBusinessId (businessId = '') {
    return client.reviews(businessId)
  }

  function getReviews (reviewResponses = []) {
    const reviews = []

    _.forEach(reviewResponses, (response) => {
      reviews.push(_.map(response.jsonBody.reviews, (review) => {
        return {
          text: review.text,
          userName: review.user.name,
          url: review.url // only there to help cross check the reviews
        }
      }))
    })

    return reviews
  }

  return {
    search
  }
}
