const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['signup', 'login', 'reset_password'],
    default: 'login'
  },
  tempData: {
    type: Object,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 10 minutes TTL auto-expiration
  }
});

otpSchema.index({ email: 1, purpose: 1 });

module.exports = mongoose.model('Otp', otpSchema);

