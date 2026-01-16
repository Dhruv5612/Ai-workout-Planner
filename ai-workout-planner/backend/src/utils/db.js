const mongoose = require('mongoose');
mongoose.set('debug', process.env.NODE_ENV === 'development');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Dhruv5612:Dhruv5612@sgp.kiylrqc.mongodb.net/?retryWrites=true&w=majority&appName=sgp");

    console.log(`
        MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

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

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};


// const connectDB = async () => {
//   const mongoURI = process.env.MONGODB_URI;

//   if (!mongoURI) {
//     console.error("❌ MONGO_URI is not defined in .env file");
//     process.exit(1);
//   }

//   try {
//     await mongoose.connect(mongoURI);
//     console.log("✅ Connected to MongoDB");
//   } catch (err) {
//     console.error("❌ Error connecting to MongoDB:", err.message);
//     process.exit(1);
//   }
// };


module.exports = connectDB;