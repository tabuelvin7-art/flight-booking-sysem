import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flight-booking';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.argv[2] || 'admin@skylinetravels.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      // Update existing user to admin
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log(`✅ User ${email} updated to admin`);
    } else {
      // Create new admin user
      const admin = new User({
        name,
        email,
        password,
        isAdmin: true
      });
      await admin.save();
      console.log(`✅ Admin user created successfully!`);
    }

    console.log('\nAdmin Credentials:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('\n⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
