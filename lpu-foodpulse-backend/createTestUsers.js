const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/lpufoodpulse').then(async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);

  let admin = await User.findOne({ email: 'admin@lpu.in' });
  if (!admin) {
    admin = await User.create({
      name: 'Admin User',
      email: 'admin@lpu.in',
      password: password,
      role: 'admin'
    });
    console.log('Admin created: admin@lpu.in / password123');
  } else {
    console.log('Admin already exists: admin@lpu.in / password123');
  }

  let student = await User.findOne({ email: 'student@lpu.in' });
  if (!student) {
    student = await User.create({
      name: 'Test Student',
      email: 'student@lpu.in',
      password: password,
      role: 'student'
    });
    console.log('Student created: student@lpu.in / password123');
  } else {
    console.log('Student already exists: student@lpu.in / password123');
  }

  process.exit(0);
});
