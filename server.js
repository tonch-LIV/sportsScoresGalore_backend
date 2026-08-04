'use strict'
// ======================================================
// Debugging Test
//
// This server.js file contains MANY intentional mistakes.
// Your job is to find and fix them.
// ======================================================

const app = require('./app');
const PORT = process.env.PORT || 3001; 



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});