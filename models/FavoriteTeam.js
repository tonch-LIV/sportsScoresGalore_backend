'use strict';

const mongoose = require('mongoose');

const favoriteTeamSchema = new mongoose.Schema(
  {
    auth0UserId: {
      type: String,
      required: true,
      index: true
    },

    teamId: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    logo: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

favoriteTeamSchema.index(
  {
    auth0UserId: 1,
    teamId: 1
  },
  {
    unique: true
  }
);

const FavoriteTeam = mongoose.model(
  'FavoriteTeam',
  favoriteTeamSchema
);

module.exports = FavoriteTeam;