const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

async function run() {
  const email = process.argv[2];
  const days = parseInt(process.argv[3] || '365', 10);

  if (!email) {
    console.error('Usage: node src/scripts/grantPremium.js <email> [daysValid]');
    process.exit(1);
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Dhruv5612:Dhruv5612@sgp.kiylrqc.mongodb.net/?retryWrites=true&w=majority&appName=sgp';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User not found for email: ${email}`);
      process.exit(1);
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    user.subscription = {
      status: 'active',
      plan: 'premium',
      startedAt: now,
      expiresAt,
      renewedAt: now,
      source: 'manual',
      notes: 'Granted premium manually via script'
    };

    await user.save();

    console.log(`✅ Granted premium to ${email} until ${expiresAt.toISOString()}`);
    process.exit(0);
  } catch (err) {
    console.error('Failed to grant premium:', err.message);
    process.exit(1);
  }
}

run();


