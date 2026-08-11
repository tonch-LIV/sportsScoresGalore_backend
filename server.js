'use strict';

const app = require('./app');
const connectToDatabase = require('./db');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      'Server startup failed:',
      error.message
    );

    process.exit(1);
  }
}

startServer();