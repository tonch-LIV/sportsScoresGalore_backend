'use strict'
// ======================================================
// Debugging Test
//
// This server.js file contains MANY intentional mistakes.
// Your job is to find and fix them.
// ======================================================

// save for later when using .env variables
// require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001

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