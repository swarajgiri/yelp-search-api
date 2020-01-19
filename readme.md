### Yelp search
Yelp search api that gets details of top 5 ice cream shops in Alpharetta.
URL - `http://localhost:8080/api/v1/search`

### Dependencies
- Docker (version >= 19.03.5)
- docker-compose (version >= 1.25.0)

### Setup and run
- Replace `PUT_YOUR_API_KEY_HERE` with actual yelp api key in `src/.env` file
- Start api server `docker-compose up`

### Run without docker
- Install nodejs LTS v12. Best way to install nodejs is [nvm](https://github.com/creationix/nvm)
- Install [yarn](https://yarnpkg.com/lang/en/docs/install)
- `cd src && yarn && yarn start:dev`

### Test
- Start api server locally, `docker-compose up`
- Run unit and integration tests `yarn test`
