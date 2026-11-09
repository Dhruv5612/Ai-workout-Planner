const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not defined in environment variables. Please set it in your .env file.');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({}).select('+password').sort({ createdAt: -1 });

    if (users.length === 0) {
      console.log('No users found in the database.');
      process.exit(0);
    }

    console.log(`📋 Found ${users.length} user(s):\n`);
    console.log('='.repeat(80));

    users.forEach((user, index) => {
      const isPremium = user.subscription?.status === 'active' && 
                       user.subscription?.plan === 'premium' &&
                       (!user.subscription?.expiresAt || user.subscription.expiresAt > new Date());
      
      console.log(`\n👤 User #${index + 1}`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Username: ${user.username || 'N/A'}`);
      console.log(`   Role: ${user.role || 'user'}`);
      console.log(`   Premium: ${isPremium ? '✅ YES' : '❌ NO'}`);
      
      if (user.subscription) {
        console.log(`   Subscription Plan: ${user.subscription.plan || 'free'}`);
        console.log(`   Subscription Status: ${user.subscription.status || 'none'}`);
        if (user.subscription.expiresAt) {
          console.log(`   Expires At: ${user.subscription.expiresAt.toISOString()}`);
        }
      }
      
      console.log(`   Created: ${user.createdAt.toISOString()}`);
      if (user.lastLogin) {
        console.log(`   Last Login: ${user.lastLogin.toISOString()}`);
      }
      console.log('-'.repeat(80));
    });

    console.log('\n💡 To login, use:');
    console.log('   POST /api/auth/login');
    console.log('   Body: { "emailOrUsername": "<email or username>", "password": "<password>" }');
    console.log('\n💡 To access user info:');
    console.log('   GET /api/users/me (requires authentication token)');
    console.log('   Header: Authorization: Bearer <token>');

    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to list users:', err.message);
    process.exit(1);
  }
}

run();
