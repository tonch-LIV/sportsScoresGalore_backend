# Sports, Scores, Galore - backEnd

## Overview

The Sports, Scores, Galore backend is an Express server that acts as the middle layer between the React frontend and external sports APIs.

Rather than exposing API keys or large third-party responses directly to the client, the backend retrieves, processes, and returns only the data required by the frontend application.

Future development will also include user authentication and storing favorite teams in MongoDB.

### Current Goals

- Serve match information through REST endpoints
- Communicate with public sports APIs
- Normalize external API responses
- Protect API keys using environment variables

### Planned Features (stretch)

- League and team lookup endpoints
- Match search by league and date
- Team filtering
- Weather integration
- Auth0 protected routes
- MongoDB favorites
- Additional sports support

### Technologies

- Node.js
- Express
- Axios
- MongoDB
- Mongoose
- dotenv
- CORS

### Frontend Repository

This backend is intended to support the [Sports, Scores, Galore React frontend](https://github.com/tonch-LIV/sportsScoresGalore).

## Screenshot

*(Coming soon)*

## Changelog

- Initial project setup