'use strict'

process.env.FOOTBALLDATA_API_URL = 'https://example.test';
process.env.FOOTBALLDATA_API_KEY = 'test-api-key';


const request = require('supertest');
const app = require('../app');

// groups requests matching endpoint
describe('GET /api/matches', () => {
  test('returns 400 when league and date are missing', async () => {
    const response = await request(app).get('/api/matches');  // simulated request sent to express app sent by supertest

    expect(response.status).toBe(400);  // looking for 400, otherwise fails
    expect(response.body).toEqual({
      message: 'League and date query parameters are required.'
    });
  });
});
