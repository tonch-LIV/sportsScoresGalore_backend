'use strict';

const express = require('express');
const mongoose = require('mongoose');

const checkJwt = require('../middleware/checkJwt');
const FavoriteTeam = require('../models/FavoriteTeam');

const router = express.Router();

router.use(checkJwt);

// Retrieve the logged-in user's favorite teams
router.get('/', async (req, res, next) => {
  try {
    const auth0UserId = req.auth.payload.sub;

    const favorites = await FavoriteTeam.find({
      auth0UserId
    }).sort({
      createdAt: -1
    });

    res.status(200).send(favorites);
  } catch (error) {
    next(error);
  }
});

// Save a team for the logged-in user
router.post('/', async (req, res, next) => {
  try {
    const auth0UserId = req.auth.payload.sub;
    const { teamId, name, logo } = req.body;

    const normalizedTeamId = Number(teamId);
    const normalizedName =
      typeof name === 'string' ? name.trim() : '';

    if (
      !Number.isFinite(normalizedTeamId) ||
      !normalizedName
    ) {
      return res.status(400).send({
        message: 'A valid team ID and team name are required.'
      });
    }

    const normalizedLogo =
      typeof logo === 'string' && logo.trim()
        ? logo.trim()
        : null;

    const favorite = await FavoriteTeam.create({
      auth0UserId,
      teamId: normalizedTeamId,
      name: normalizedName,
      logo: normalizedLogo
    });

    return res.status(201).send(favorite);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({
        message: 'This team is already a favorite.'
      });
    }

    return next(error);
  }
});

// Remove one of the logged-in user's favorite teams
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: 'The favorite ID is invalid.'
      });
    }

    const auth0UserId = req.auth.payload.sub;

    const deletedFavorite =
      await FavoriteTeam.findOneAndDelete({
        _id: req.params.id,
        auth0UserId
      });

    if (!deletedFavorite) {
      return res.status(404).send({
        message: 'Favorite team not found.'
      });
    }

    return res.status(200).send({
      message: 'Favorite team removed.',
      favorite: deletedFavorite
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;