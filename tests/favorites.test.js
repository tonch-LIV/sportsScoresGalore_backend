'use strict'

process.env.FOOTBALLDATA_API_URL = 'https://example.test';
process.env.FOOTBALLDATA_API_KEY = 'test-api-key';
process.env.AUTH0_AUDIENCE =
  'https://sports-scores-galore-api';
process.env.AUTH0_ISSUER_BASE_URL =
  'https://example.auth0.com/';

const request = require('supertest');
const app = require('../app');

describe('GET /api/favorites', () => {
  test('returns 401 when the access token is missing', async () => {
    const response = await request(app)
      .get('/api/favorites');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'A valid access token is required.'
    });
  });
});