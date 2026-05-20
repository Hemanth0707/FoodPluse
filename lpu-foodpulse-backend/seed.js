const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stall = require('./models/Stall');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const Order = require('./models/Order');
const bcrypt = require('bcryptjs');

dotenv.config();

const lpuStallsData = [
  {
    name: "Central Mess", category: "Fast Food", location: "Block 25 Food Court", rating: 4.8,
    items: [
      { name: 'Paneer Wrap', pointsCost: 120, prepTime: 10, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1626804475297-4160cbdb1c2b?w=500&q=80' },
      { name: 'Veg Burger', pointsCost: 90, prepTime: 8, category: 'Fast Food', rating: 4.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
      { name: 'Cheese Pasta', pointsCost: 150, prepTime: 12, category: 'Meals', rating: 4.8, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80' },
      { name: 'Garlic Bread', pointsCost: 80, prepTime: 5, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&q=80' },
      { name: 'White Sauce Pasta', pointsCost: 160, prepTime: 15, category: 'Meals', rating: 4.9, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80' },
      { name: 'Mexican Fries', pointsCost: 100, prepTime: 8, category: 'Fast Food', rating: 4.7, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
      { name: 'Veg Pizza', pointsCost: 200, prepTime: 20, category: 'Fast Food', rating: 4.8, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80' },
      { name: 'Cold Coffee', pointsCost: 80, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' }
    ]
  },
  {
    name: "Boys Hostel Mess 1", category: "Meals", location: "Block 28 Food Court", rating: 4.9,
    items: [
      { name: 'Masala Dosa', pointsCost: 80, prepTime: 10, category: 'Meals', rating: 4.9, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&q=80' },
      { name: 'Idli', pointsCost: 40, prepTime: 5, category: 'Breakfast', rating: 4.8, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80' },
      { name: 'Vada', pointsCost: 45, prepTime: 5, category: 'Breakfast', rating: 4.6, image: 'https://images.unsplash.com/photo-1626082895617-2c6b301cb001?w=500&q=80' },
      { name: 'Filter Coffee', pointsCost: 30, prepTime: 3, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80' }
    ]
  },
  {
    name: "Girls Hostel Mess", category: "Healthy", location: "Uni Mall", rating: 4.9,
    items: [
      { name: 'Protein Shake', pointsCost: 150, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80' },
      { name: 'Oats Bowl', pointsCost: 90, prepTime: 8, category: 'Healthy', rating: 4.7, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80' },
      { name: 'Paneer Salad', pointsCost: 130, prepTime: 10, category: 'Healthy', rating: 4.9, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' }
    ]
  },
  {
    name: "Uni Mall Mess", category: "Beverages", location: "Block 34", rating: 4.6,
    items: [
      { name: 'Fresh Juice', pointsCost: 60, prepTime: 5, category: 'Beverages', rating: 4.7, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80' },
      { name: 'Oreo Shake', pointsCost: 100, prepTime: 5, category: 'Beverages', rating: 4.8, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&q=80' },
      { name: 'Cold Coffee', pointsCost: 80, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' }
    ]
  },
  {
    name: "Food Court Central", category: "Snacks", location: "Block 34", rating: 4.7,
    items: [
      { name: 'Paneer Roll', pointsCost: 100, prepTime: 8, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Cheese Roll', pointsCost: 90, prepTime: 8, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' }
    ]
  },
  {
    name: "Night Canteen", category: "Snacks", location: "Block 25", rating: 4.5,
    items: [
      { name: 'Samosa', pointsCost: 20, prepTime: 2, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
      { name: 'Maggi', pointsCost: 40, prepTime: 5, category: 'Fast Food', rating: 4.9, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80' }
    ]
  },
  {
    name: "Boys Hostel Mess 2", category: "Meals", location: "Block 28 Food Court", rating: 4.8,
    items: [
      { name: 'Paneer Butter Masala', pointsCost: 150, prepTime: 15, category: 'Meals', rating: 4.8, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=500&q=80' },
      { name: 'Veg Biryani', pointsCost: 120, prepTime: 20, category: 'Meals', rating: 4.7, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80' }
    ]
  },
  {
    name: "Healthy Mess Corner", category: "Healthy", location: "Uni Mall", rating: 4.9,
    items: [
      { name: 'Oats Bowl', pointsCost: 90, prepTime: 8, category: 'Healthy', rating: 4.7, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80' },
      { name: 'Quinoa Salad', pointsCost: 140, prepTime: 10, category: 'Healthy', rating: 4.6, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' }
    ]
  }
];

const seedDB = async () => {
  try {
    console.log('Starting Massive Swiggy-style Demo Seeding...');

    // Wipe Collections
    await Stall.deleteMany();
    await MenuItem.deleteMany();
    await User.deleteMany();
    await Complaint.deleteMany();
    await Order.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // Create Standard Users
    const admin = await User.create({ name: 'Admin User', email: 'admin@lpu.in', password, role: 'admin' });
    const student = await User.create({ name: 'Demo Student', email: 'student@lpu.in', lpuId: '12345678', password, role: 'student', hostel: 'BH1', mess: 'Mess 1', department: 'B.Tech CSE', year: 3, foodPoints: 2000 });
    const owner = await User.create({ name: 'Stall Manager', email: 'owner@lpu.in', password, role: 'stall_owner' });

    console.log('Users created.');

    // Seed Stalls & Menu Items
    const stallIds = [];
    const allMenuItems = [];

    for (const stallData of lpuStallsData) {
      const stall = await Stall.create({
        name: stallData.name,
        ownerId: owner._id,
        description: `Premium ${stallData.category} at ${stallData.location}`,
        isOpen: true,
        category: stallData.category,
        location: stallData.location,
        rating: stallData.rating
      });
      stallIds.push(stall._id);

      const menuItemsToInsert = stallData.items.map(item => ({ ...item, stallId: stall._id }));
      const insertedItems = await MenuItem.insertMany(menuItemsToInsert);
      allMenuItems.push(...insertedItems);
    }
    console.log('Stalls and Menus seeded with massive premium data.');

    // Generate Massive Demo Data: 150+ Complaints
    const hostels = ['BH1', 'BH2', 'BH3', 'GH1', 'GH2', 'GH3'];
    const messes = ['Mess 1', 'Mess 2', 'Mess 3'];
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
    const issues = ['Bad taste', 'Undercooked', 'Overcooked', 'Unhygienic', 'Low quantity', 'Repeated menu', 'Stale food'];
    
    const complaintsToInsert = [];
    for (let i = 0; i < 150; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      const isProblematic = Math.random() > 0.6;
      
      const randomStall = stallIds[Math.floor(Math.random() * stallIds.length)];

      complaintsToInsert.push({
        studentId: student._id,
        stallId: randomStall,
        hostel: isProblematic ? 'BH1' : hostels[Math.floor(Math.random() * hostels.length)],
        mess: isProblematic ? 'Mess 1' : messes[Math.floor(Math.random() * messes.length)],
        mealType: mealTypes[Math.floor(Math.random() * mealTypes.length)],
        issueType: issues[Math.floor(Math.random() * issues.length)],
        description: 'Auto-generated demo complaint for presentation.',
        status: Math.random() > 0.2 ? 'Verified' : 'Pending',
        createdAt: randomDate
      });
    }
    await Complaint.insertMany(complaintsToInsert);
    console.log('150 Demo Complaints Seeded.');

    // Generate Massive Demo Data: 60+ Orders
    const ordersToInsert = [];
    for (let i = 0; i < 60; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 15));
      const randomItem = allMenuItems[Math.floor(Math.random() * allMenuItems.length)];
      const isRecent = Math.random() > 0.9; 
      
      ordersToInsert.push({
        studentId: student._id,
        stallId: randomItem.stallId,
        items: [{ menuItemId: randomItem._id, name: randomItem.name, quantity: Math.floor(Math.random() * 2) + 1, pointsCost: randomItem.pointsCost }],
        totalPoints: randomItem.pointsCost * (Math.floor(Math.random() * 2) + 1),
        qrCodeToken: Math.random().toString(36).substring(2, 10).toUpperCase(),
        status: isRecent ? 'Preparing' : 'Collected',
        createdAt: isRecent ? new Date() : randomDate
      });
    }
    await Order.insertMany(ordersToInsert);
    console.log('60 Demo Orders Seeded.');

    console.log('=============================================');
    console.log('MASSIVE PREMIUM SEEDING COMPLETE! APP IS READY FOR VIVA.');
    console.log('Admin: admin@lpu.in | password123');
    console.log('Student: student@lpu.in | password123');
    console.log('=============================================');
    console.log('=============================================');
  } catch (error) {
    console.error('Seeding Error:', error);
  }
};

module.exports = seedDB;
