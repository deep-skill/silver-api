const {auth} = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-jnyecsm3rq2plckz.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;