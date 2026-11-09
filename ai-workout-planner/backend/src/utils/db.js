const mongoose = require('mongoose');
mongoose.set('debug', process.env.NODE_ENV === 'development');
const dotenv = require('dotenv');
dotenv.config();

let dbError = null;

const getDbError = () => dbError;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    dbError = 'MONGODB_URI is not defined in environment variables';
    console.error(`❌ ${dbError}. Please configure it in your backend/.env file.`);
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    dbError = null;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      dbError = err.message;
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return true;
  } catch (error) {
    dbError = error.message;
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.error('👉 Please check your MONGODB_URI in backend/.env (verify username, password, and IP access in MongoDB Atlas).');
    return false;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
});

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.getDbError = getDbError;
