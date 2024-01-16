const {auth} = require('express-oauth2-jwt-bearer');
const { AUDIENCE, ISSUERBASEURL, TOKENSIGNINGALG } = process.env

const jwtCheck = auth({
  audience: `${AUDIENCE}`,
  issuerBaseURL: `${ISSUERBASEURL}`,
  tokenSigningAlg: `${TOKENSIGNINGALG}`
});

module.exports = jwtCheck;