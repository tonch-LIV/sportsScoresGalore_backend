'use strict'

process.env.FOOTBALLDATA_API_URL = 'https://example.test';
process.env.FOOTBALLDATA_API_KEY = 'test-api-key';

process.env.AUTH0_AUDIENCE =
  'https://sports-scores-galore-api';
process.env.AUTH0_ISSUER_BASE_URL =
  'https://example.auth0.com/';

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

  test('returns 400 when league is missing', async () => {
    const response = await request(app).get('/api/matches?date=2026-07-28');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'League and date query parameters are required.'
    });
  });

  test('returns 400 when date is missing', async () => {
    const response = await request(app).get('/api/matches?league=45');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'League and date query parameters are required.'
    });
  });

  test('returns 400 for an unsupported competition', async () => {
    const response = await request(app).get('/api/matches?league=999&date=2026-07-28');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'The requested competition is not supported.'
    });
  });

  test('returns 400 when the date has an invalid format', async () => {
    const response = await request(app).get('/api/matches?league=45&date=July-28-2026');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Date must be a valid date using YYYY-MM-DD format.'
    });
  });

  test('returns 400 when the date is impossible', async () => {
    const response = await request(app).get('/api/matches?league=45&date=2026-02-30');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Date must be a valid date using YYYY-MM-DD format.'
    });
  });
  
});
