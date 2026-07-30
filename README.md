# Sports, Scores, Galore - backEnd

- [Overview](#overview)
  - [Current Goals](#current-goals)
    - [Supported Competitions](#supported-competitions)
    - [Season Selection](#season-selection)
  - [Planned Features (stretch)](#planned-features-stretch)
  - [Technologies](#technologies)
- [Frontend Repository](#frontend-repository)
- [Screenshots](#screenshots)
- [Changelog](#changelog)
-[If I Had More Time](#if-i-had-more-time)

## Overview

The Sports, Scores, Galore backend is a Node.js and Express server that acts as the middle layer between the React frontend and external sports API data services.

The server retrieves soccer data from [Footballdata.io](https://footballdata.io/), protects the external API key, validates incoming requests, and transforms large API responses into smaller objects containing only the information required by the frontend.

Future development may also include weather integration, Auth0-protected routes, and MongoDB storage for favorite teams.

### Current Goals

- Serve match information through REST endpoints for the React frontend
- Communicate with [Footballdata.io](https://footballdata.io/) API
- Validate incoming query parameters
- Normalize external API responses
- Return consistent loading and error responses
- Support manual score and fixture refreshes

#### Supported Competitions

The initial version will support:

| Competition            | Footballdata.io League ID  |
|------------------------|---------------------------:|
| Premier League         | 15                         |
| La Liga                | 10                         |
| UEFA Champions League  | 45                         |
| UEFA Europa League     | 46                         |
| FIFA World Cup         | 50                         |

#### Season Selection

Some API responses may mark multiple seasons as current. The backend should therefore avoid relying only on the API’s `is_current` field.

The planned season-selection rules are:

1. Choose the season whose date range contains the requested date.
2. If the competition is between seasons, choose the nearest upcoming season.
3. If season date information is unavailable, choose the newest season that contains teams.

### Planned Features (stretch)

- League and team lookup endpoints
- Match search by league and date
- Team filtering
- Weather API integration
- Auth0 protected routes
- MongoDB favorites
- Nearby restaurant and local-information services
- Additional sports support

### Technologies

- Node.js
- Express
- Axios
- MongoDB
- Mongoose
- dotenv
- Auth0
- CORS

### Frontend Repository

This backend is intended to support the [Sports, Scores, Galore React frontend](https://github.com/tonch-LIV/sportsScoresGalore).

## Screenshot

*(Coming soon)*

## Changelog

- Initial Express project setup
- **`test`** branch created.  
  - Tested API-Football and documented its free-plan date and season restrictions.
- Selected Footballdata.io as the primary soccer data provider.
- Confirmed competition, fixture, result, team, season, venue, and full-match endpoints.
- Confirmed a monthly free-plan allowance of 2,000 API requests.

## If I Had More Time

-