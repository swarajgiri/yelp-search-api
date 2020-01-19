/* eslint-env jest */

const superagent = require('superagent')
const { baseUrl } = require('../../cfg')
const _ = require('lodash')

describe('search', () => {
  test('should return data in expected format', async () => {
    const response = await superagent.get(`${baseUrl}/search`)

    const fetchedProperties = _.keys(response.body)
    const expectedProperties = [
      'status',
      'data',
      'errors'
    ]

    expect(_.difference(expectedProperties, fetchedProperties).length).toEqual(0)

    const results = response.body.data

    _.forEach(results, (business) => {
      const fetchedProperties = _.keys(business)
      const expectedProperties = [
        'id',
        'name',
        'rating',
        'address',
        'reviews'
      ]

      expect(_.difference(expectedProperties, fetchedProperties).length).toEqual(0)

      _.forEach(business.reviews, (review) => {
        const fetchedProperties = _.keys(review)

        const expectedProperties = [
          'text',
          'userName',
          'url'
        ]

        expect(_.difference(expectedProperties, fetchedProperties).length).toEqual(0)
      })
    })
  })
})
