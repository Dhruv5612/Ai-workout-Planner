require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./utils/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });

    // Connect to database asynchronously
    await connectDB();

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n${signal} received, shutting down...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
