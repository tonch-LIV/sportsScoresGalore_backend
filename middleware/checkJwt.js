'use strict';

const {
  auth
} = require('express-oauth2-jwt-bearer');

const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const AUTH0_ISSUER_BASE_URL =
  process.env.AUTH0_ISSUER_BASE_URL;

if (!AUTH0_AUDIENCE || !AUTH0_ISSUER_BASE_URL) {
  throw new Error(
    'AUTH0_AUDIENCE and AUTH0_ISSUER_BASE_URL must be configured.'
  );
}

// express middleware created; between request and protected route
const checkJwt = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

module.exports = checkJwt;