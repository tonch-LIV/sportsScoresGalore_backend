# Sports, Scores, Galore - backEnd

- [Overview](#overview)
  - [Current Goals](#current-goals)
    - [Initial Match Route](#initial-match-route)
    - [Supported Competitions](#supported-competitions)
    - [Season Selection](#season-selection)
  - [Planned Features (stretch)](#planned-features-stretch)
  - [Technologies](#technologies)
  - [Environment Variables](#environment-variables)
- [Frontend Repository](#frontend-repository)
- [Screenshots](#screenshots)
- [Local Development](#local-development)
- [Changelog](#changelog)
<!-- - [If I Had More Time](#if-i-had-more-time) -->

## Overview

The Sports, Scores, Galore backend is a Node.js and Express server that acts as the middle layer between the React frontend and external sports API data services.

The server retrieves soccer data from [Footballdata.io](https://footballdata.io/), protects the external API key, validates incoming requests, and transforms large API responses into smaller objects containing only the information required by the frontend.

Future development may also include weather integration, Auth0-protected routes, and MongoDB storage for favorite teams.

### Current Goals

- Serve match information through REST endpoints for the React frontend
- Search for matches by competition and date
- Communicate with [Footballdata.io](https://footballdata.io/) API
- Validate incoming query parameters
- Normalize external API responses
- Return consistent success and error responses
- Support manual score and fixture refreshes

#### Initial Match Route

The initial match endpoint will use this general format:

```
GET /api/matches?league=45&date=2026-07-28
```

The route will receive:

1. Receive a competition ID and date from frontend.  
2. Validate the required query parameters.  
3. Request matching data from Footballdata.io.  
4. Remove fields that the frontend does not require.  
5. Return a simplified array of match objects.  

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

- Competition and team lookup endpoints
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

### Environment Variables

External API configuration is stored in the backend `.env` file. The `.env` file is ignored by Git and must never be committed.

Required variables:

```env
FOOTBALLDATA_API_URL=your_api_url
FOOTBALLDATA_API_KEY=your_api_key
```

## Frontend Repository

This backend is intended to support the [Sports, Scores, Galore React frontend](https://github.com/tonch-LIV/sportsScoresGalore).

## Screenshots

*(Coming soon)*

## Local Development

Install dependencies:

```bash
npm install
```

## Changelog

- Initial Express project setup
- **`test`** branch created.  
  - Tested API-Football and documented its free-plan date and season restrictions.
  - Selected Footballdata.io as the primary soccer data provider.
  - Confirmed competition, fixture, result, team, season, venue, and full-match endpoints.
  - Confirmed a monthly free-plan allowance of 2,000 API requests.
  - updated `"main": "server.js"` and added command that automatically refreshes server `"dev": "node --watch server.js"`; `package.json`.
  - created `competitions` object as allowlist for valid IDs, rejecting info on any others; `server.js`.
  - created GET request for `/api/matches` with validation checks; `server.js`.
  - enable use of `.env` variables (`require('dotenv').config`), defined variable names (`FOOTBALLDATA_API_URL` and `FOOTBALLDATA_API_KEY`) with error check if not setup, and imported `axios`; `server.js`.
  - updated GET request of `'/api/matches'` to be asynchronous, allowing adequate loading between external request and internal server; `server.js`.
  - replaced temporary successful response with validation checks and status responses; `server.js`.
  - `curl` requests are successful.
  - modify raw respose from `curl` into usable object for data needed / want to render; `dateIsValid`; `server.js`.
  - fixed misspellings in `timestamp: match.date_unix,` and `name: match.league?.competition_name` that lead to incomplete / `undefined` return from omitted properties from request; `providerMatches.map()` ; `server.js`.
  - added `console.log()` after `providerMatches` variable for feedback on how many matches were returned for league and date requested; `server.js`.
  - began modularizing by separating app from startup; re-naming `server.js` -> `app.js`.
  - re-structured application by removing network functionality and exported to `server.js`, ensuring single responsibility. `app.js`.
  - installed `jest` and `supertest`; updated `"test": "test"`; `package.json`.
  - created `test` subdirectory -> `matches.test.js`.
  - further validation tests added to cover correct date, wrong format , as well as correct format, but nonexistent date; `matches.test.js`.
  - added to `.gitignore` dont kow if it's too late since it's already been pushed to github, but shouldn't hurt...

<!-- ## If I Had More Time

- -->