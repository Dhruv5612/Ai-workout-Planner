const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { getDbError } = require('./utils/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const planRoutes = require('./routes/planRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Trust proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Compression middleware
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get(['/health', '/api/health'], (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'success' : 'degraded',
    message: isDbConnected ? 'Server and database are healthy' : 'Server is running, but database is disconnected',
    database: isDbConnected ? 'connected' : 'disconnected',
    dbError: getDbError() || null,
    timestamp: new Date().toISOString()
  });
});

// Database connection check middleware for API requests
app.use('/api', (req, res, next) => {
  if (req.path === '/health') return next();
  if (mongoose.connection.readyState !== 1) {
    const errorMsg = getDbError();
    const details = errorMsg ? `: ${errorMsg}` : '';
    return res.status(503).json({
      success: false,
      message: `Database connection unavailable${details}. Please check your MONGODB_URI in backend/.env.`
    });
  }
  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/admin', adminRoutes);

// Handle undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Handle specific MongoDB errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(error.errors).map(val => val.message);
    message = `Validation Error: ${errors.join(', ')}`;
  }

  if (error.code === 11000) {
    statusCode = 400;
    const field = Object.keys(error.keyValue)[0];
    message = `Duplicate field value: ${field}. Please use another value!`;
  }

  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again!';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your token has expired! Please log in again.';
  }

  res.status(statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: error.stack })
  });
});

module.exports = app;