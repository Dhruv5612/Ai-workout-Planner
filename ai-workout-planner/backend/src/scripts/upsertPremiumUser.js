const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

async function run() {
  const email = process.argv[2];
  const password = process.argv[3];
  const days = parseInt(process.argv[4] || '365', 10);

  if (!email || !password) {
    console.error('Usage: node src/scripts/upsertPremiumUser.js <email> <password> [daysValid]');
    process.exit(1);
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not defined in environment variables. Please set it in your .env file.');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    let user = await User.findOne({ email }).select('+password');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    if (!user) {
      const nameFromEmail = email.split('@')[0];
      user = new User({
        name: nameFromEmail,
        email,
        password,
        role: 'user',
        subscription: {
          status: 'active',
          plan: 'premium',
          startedAt: now,
          expiresAt,
          renewedAt: now,
          source: 'manual',
          notes: 'Granted premium via upsert script'
        }
      });
      await user.save();
      console.log(`✅ Created user ${email} with premium until ${expiresAt.toISOString()}`);
    } else {
      const passwordChanged = !!password;
      if (passwordChanged) {
        user.password = password; // will be hashed by pre-save
      }
      user.subscription = {
        status: 'active',
        plan: 'premium',
        startedAt: now,
        expiresAt,
        renewedAt: now,
        source: 'manual',
        notes: 'Granted premium via upsert script'
      };
      await user.save();
      console.log(`✅ Updated user ${email} with premium until ${expiresAt.toISOString()}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Failed to upsert premium user:', err.message);
    process.exit(1);
  }
}

run();
