'use strict'

process.env.FOOTBALLDATA_API_URL = 'https://example.test';
process.env.FOOTBALLDATA_API_KEY = 'test-api-key';
process.env.AUTH0_AUDIENCE =
  'https://sports-scores-galore-api';
process.env.AUTH0_ISSUER_BASE_URL =
  'https://example.auth0.com/';

const request = require('supertest');
const app = require('../app');

describe('/api/favorites authentication', () => {
  test('GET rejects a missing access token', async () => {
    const response = await request(app)
      .get('/api/favorites');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'A valid access token is required.'
    });
  });

  test('POST rejects a missing access token', async () => {
    const response = await request(app)
      .post('/api/favorites')
      .send({
        teamId: 1,
        name: 'Example Team'
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'A valid access token is required.'
    });
  });

  test('DELETE rejects a missing access token', async () => {
    const response = await request(app)
      .delete(
        '/api/favorites/507f1f77bcf86cd799439011'
      );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'A valid access token is required.'
    });
  });
});