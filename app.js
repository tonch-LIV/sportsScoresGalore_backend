'use strict'

require('dotenv').config({
  quiet: process.env.NODE_ENV === 'test'
});  // quiets messages during test

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const favoritesRouter = require('./routes/favorites');

const app = express();

// .env variables
const FOOTBALLDATA_API_URL = process.env.FOOTBALLDATA_API_URL;
const FOOTBALLDATA_API_KEY = process.env.FOOTBALLDATA_API_KEY;

if (!FOOTBALLDATA_API_URL || !FOOTBALLDATA_API_KEY) {
  throw new Error(
    'FOOTBALLDATA_API_URL and FOOTBALLDATA_API_KEY must be configured.'
  );
}

const competitions = {
  10: 'La Liga',
  15: 'Premier League',
  45: 'UEFA Champions League',
  46: 'UEFA Europa League',
  50: "FIFA World Cup"
};

// const morgon = require('morgan')


// =============
// middleware  |
// ============
app.use(cors());
// app.use(morgan('dev'))
app.use(express.json());

// =========
// routes  |
// ========

// home
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.get('/api/health', (req, res) => {
  res.status(200).send({
    status: 'ok',
    message: 'Sports, Scores, Galore API is running.'
  });
});

app.get('/api/matches', async (req, res) => {
  const { league, date } = req.query;

  if (!league || !date) {
    return res.status(400).send({
      message: 'League and date query parameters are required.'
    });
  }

  if (!competitions[league]) {
    return res.status(400).send({
      message: 'The requested competition is not supported.'
    });
  }

  // date validation checks
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; 
  const requestedDate = new Date(`${date}T00:00:00Z`);
  
  const dateisValid = 
    datePattern.test(date) &&  // YYYY-MM-DD
    !Number.isNaN(requestedDate.getTime()) &&  // whether JS can interpret as safe format 
    requestedDate.toISOString().startsWith(date);  // catches impossible dates

  if (!dateisValid) {
    return res.status(400).send({
      message: 'Date must be a valid date using YYYY-MM-DD format.'
    });
  }

  try {
    const baseUrl = FOOTBALLDATA_API_URL.replace(/\/$/, '');  // extra slash fail safe
    const requestUrl = `${baseUrl}/matches/date/${date}`;

    const apiResponse = await axios.get(requestUrl, {
      params: {
        league_id: Number(league)  // converted to URI (?league_id=[insert.number.here]) by axios
      },
      headers: {
        Authorization: `Bearer ${FOOTBALLDATA_API_KEY}`
      }
    });

    const providerMatches = apiResponse.data?.data?.matches ?? [];

    console.log(
      `Footballdata.io returned ${providerMatches.length} match(es) ` + 
      `for league ${league} on ${date}.`
    );
    
    // .map() takes large array of data received from api and segments into pieces needed
    const matches = providerMatches.map((match) => ({
      id: match.match_id,
      date: match.match_date,
      timestamp: match.date_unix,

      status: match.status,
      displayStatus: match.status_localized || match.status,

      league: {
        id: match.league?.league_id ?? null,
        name: match.league?.competition_name || match.league?.name || 'Unknown',
        logo: match.league?.image || null
      },

      homeTeam: {
        id: match.home_team?.team_id ?? null,
        name: match.home_team?.team_name || 'Unknown',
        logo: match.home_team?.team_logo || null
      },

      awayTeam: {
        id: match.away_team?.team_id ?? null,
        name: match.away_team?.team_name || 'Unknown',
        logo: match.away_team?.team_logo || null
      },

      score: {
        home: match.score?.home ?? null,
        away: match.score?.away ?? null
      },

      venue: {
        name: match.venue?.stadium_name || null,
        location: match.venue?.stadium_location || null
      }
    }));

    res.status(200).send({
      competition: {
        id: Number(league),
        name: competitions[league]
      },
      date: apiResponse.data?.data?.date || date,
      matches
    });
  } catch (error) {
    const providerStatus = error.response?.status;  // `?` displays status only if response exists;  
    const providerMessage = 
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;

    console.error(
      'Footballdata.io request failed:',
      providerStatus,
      providerMessage
    );

    res.status(502).send({
      message: 'Unable to retrieve matches from Footballdata.io.'
    });
  }
});

// retrieve weather 


// retrieve favorites 
app.use('/api/favorites', favoritesRouter);

// create a favorite


// delete a favorite


// update a favorite


// ======================
// error testing route  |
// ======================
// app.get('/error', (req, res) => {
//   throw new Error("Testing errors.");
// });

// 404
app.use((req, res) => {
  res.status(404).send({
    message: "Page Not Found."
  });
});

// error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status =
    error.status || error.statusCode || 500;

  if (status === 401) {
    return res.status(401).send({
      message: 'A valid access token is required.'
    });
  }

  console.error('Unhandled server error:', error.message);

  return res.status(500).send({
    message: 'Internal server error.'
  });
});

module.exports = app;