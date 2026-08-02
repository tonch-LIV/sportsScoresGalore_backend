'use strict'
// ======================================================
// Debugging Test
//
// This server.js file contains MANY intentional mistakes.
// Your job is to find and fix them.
// ======================================================

// save for later when using .env variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001; 

// .env variables
const FOOTBALLDATA_API_URL = process.env.FOOTBALLDATA_API_URL;
const FOOTBALLDATA_API_KEY = process.env.FOOTBALLDATA_API_KEY;

if (!FOOTBALLDATA_API_URL || !FOOTBALLDATA_API_KEY) {
  throw new Error(
    'FOOTBALLDATA_API_URL and FOOTBALLDATA_API_KEY must be configured.'
  );
};

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

    res.status(200).send(apiResponse.data);
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
  };
});

// retrieve weather 
app.get('/weather', (req, res) => {
  res.send({
    city: "Seattle",
    forecast: "Rain"
  });
});

// retrieve favorites 
app.get('/favorites', (req, res) => {
  res.send({
    message: "Favorites route is working!",
    favorites: []
  });
});

// create a favorite
app.post('/favorites', (req, res) => {
  const city = req.body.city;
  console.log(city);

  res.send({
    message: "Favorite saved!",
    city: city
  });
});

// delete a favorite
app.delete('/favorites/:id', (req, res) => {
  const id = req.params.id;
  res.send({
    message: `Deleted ${id}`
  });
});


// update a favorite
app.put('/favorites/:id', (req, res) => {
  const id = req.params.id;
  const city = req.body.city;

  res.send({
    id,
    city,
    message: "Updated!"
  });
});

// ======================
// error testing route  |
// ======================
app.get('/error', (req, res) => {
  throw new Error("Testing errors.");
});

// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).send({
    message: 'Internal server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});