const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

async function run() {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.error('Usage: node src/scripts/resetPassword.js <email> <newPassword>');
    console.error('Example: node src/scripts/resetPassword.js user@example.com NewPassword123!');
    process.exit(1);
  }

  if (newPassword.length < 6) {
    console.error('❌ Password must be at least 6 characters long');
    process.exit(1);
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Dhruv5612:Dhruv5612@sgp.kiylrqc.mongodb.net/?retryWrites=true&w=majority&appName=sgp';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.error(`❌ User not found for email: ${email}`);
      process.exit(1);
    }

    console.log(`📧 Found user: ${user.name} (${user.email})`);
    console.log(`👤 Username: ${user.username || 'N/A'}\n`);

    // Set new password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    console.log('✅ Password reset successfully!');
    console.log(`\n📝 New login credentials:`);
    console.log(`   Email/Username: ${email} or ${user.username || email}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`\n⚠️  Please change this password after logging in!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to reset password:', err.message);
    process.exit(1);
  }
}

run();

