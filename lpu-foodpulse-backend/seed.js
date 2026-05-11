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
    name: "Kitchen Ate", category: "Fast Food", location: "Block 25 Food Court", rating: 4.8,
    items: [
      { name: 'Paneer Wrap', pointsCost: 120, prepTime: 10, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1626804475297-4160cbdb1c2b?w=500&q=80' },
      { name: 'Veg Burger', pointsCost: 90, prepTime: 8, category: 'Fast Food', rating: 4.5, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80' },
      { name: 'Cheese Pasta', pointsCost: 150, prepTime: 12, category: 'Meals', rating: 4.8, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&q=80' },
      { name: 'Garlic Bread', pointsCost: 80, prepTime: 5, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&q=80' },
      { name: 'White Sauce Pasta', pointsCost: 160, prepTime: 15, category: 'Meals', rating: 4.9, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80' },
      { name: 'Mexican Fries', pointsCost: 100, prepTime: 8, category: 'Fast Food', rating: 4.7, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
      { name: 'Veg Pizza', pointsCost: 200, prepTime: 20, category: 'Fast Food', rating: 4.8, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80' },
      { name: 'Cold Coffee', pointsCost: 80, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' },
      { name: 'Peri Peri Fries', pointsCost: 110, prepTime: 8, category: 'Fast Food', rating: 4.6, image: 'https://images.unsplash.com/photo-1530016555861-3d1f3f5fd94b?w=500&q=80' },
      { name: 'Cheese Burst Burger', pointsCost: 130, prepTime: 10, category: 'Fast Food', rating: 4.7, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80' },
      { name: 'Hazelnut Frappe', pointsCost: 150, prepTime: 5, category: 'Beverages', rating: 4.8, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
      { name: 'Veggie Delight Pizza', pointsCost: 220, prepTime: 20, category: 'Fast Food', rating: 4.5, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80' },
      { name: 'Stuffed Garlic Bread', pointsCost: 110, prepTime: 10, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=500&q=80' },
      { name: 'Mac & Cheese', pointsCost: 170, prepTime: 15, category: 'Meals', rating: 4.7, image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=500&q=80' },
      { name: 'Oreo Shake', pointsCost: 120, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&q=80' }
    ]
  },
  {
    name: "South Indian Kitchen", category: "Meals", location: "Block 28 Food Court", rating: 4.9,
    items: [
      { name: 'Masala Dosa', pointsCost: 80, prepTime: 10, category: 'Meals', rating: 4.9, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&q=80' },
      { name: 'Plain Dosa', pointsCost: 60, prepTime: 8, category: 'Meals', rating: 4.7, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&q=80' },
      { name: 'Idli', pointsCost: 40, prepTime: 5, category: 'Breakfast', rating: 4.8, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&q=80' },
      { name: 'Vada', pointsCost: 45, prepTime: 5, category: 'Breakfast', rating: 4.6, image: 'https://images.unsplash.com/photo-1626082895617-2c6b301cb001?w=500&q=80' },
      { name: 'Pongal', pointsCost: 70, prepTime: 8, category: 'Meals', rating: 4.5, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80' },
      { name: 'Uttapam', pointsCost: 80, prepTime: 10, category: 'Meals', rating: 4.7, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&q=80' },
      { name: 'Filter Coffee', pointsCost: 30, prepTime: 3, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80' },
      { name: 'Mini Meals', pointsCost: 120, prepTime: 5, category: 'Meals', rating: 4.8, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80' },
      { name: 'Mysore Masala Dosa', pointsCost: 100, prepTime: 12, category: 'Meals', rating: 4.9, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&q=80' },
      { name: 'Rava Dosa', pointsCost: 90, prepTime: 12, category: 'Meals', rating: 4.6, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&q=80' },
      { name: 'Curd Rice', pointsCost: 70, prepTime: 5, category: 'Meals', rating: 4.8, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80' },
      { name: 'Sambar Vada', pointsCost: 60, prepTime: 5, category: 'Breakfast', rating: 4.7, image: 'https://images.unsplash.com/photo-1626082895617-2c6b301cb001?w=500&q=80' },
      { name: 'Tomato Uttapam', pointsCost: 90, prepTime: 10, category: 'Meals', rating: 4.5, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&q=80' },
      { name: 'Sweet Pongal', pointsCost: 60, prepTime: 5, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80' },
      { name: 'Upma', pointsCost: 50, prepTime: 5, category: 'Breakfast', rating: 4.4, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80' }
    ]
  },
  {
    name: "Protein House", category: "Healthy", location: "Uni Mall", rating: 4.9,
    items: [
      { name: 'Protein Shake', pointsCost: 150, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80' },
      { name: 'Peanut Butter Toast', pointsCost: 70, prepTime: 5, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80' },
      { name: 'Oats Bowl', pointsCost: 90, prepTime: 8, category: 'Healthy', rating: 4.7, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80' },
      { name: 'Banana Smoothie', pointsCost: 110, prepTime: 5, category: 'Beverages', rating: 4.8, image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=500&q=80' },
      { name: 'Paneer Salad', pointsCost: 130, prepTime: 10, category: 'Healthy', rating: 4.9, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
      { name: 'Tofu Salad', pointsCost: 140, prepTime: 10, category: 'Healthy', rating: 4.6, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
      { name: 'Multigrain Sandwich', pointsCost: 100, prepTime: 8, category: 'Healthy', rating: 4.8, image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=500&q=80' },
      { name: 'Mixed Fruit Bowl', pointsCost: 80, prepTime: 5, category: 'Healthy', rating: 4.9, image: 'https://images.unsplash.com/photo-1490474418585-ba9f52c212d2?w=500&q=80' },
      { name: 'Detox Green Juice', pointsCost: 120, prepTime: 5, category: 'Beverages', rating: 4.7, image: 'https://images.unsplash.com/photo-1622288000030-f2c96c561b36?w=500&q=80' },
      { name: 'Quinoa Bowl', pointsCost: 180, prepTime: 15, category: 'Healthy', rating: 4.8, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
      { name: 'Almond Milk Smoothie', pointsCost: 140, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=500&q=80' },
      { name: 'Sprouts Chaat', pointsCost: 60, prepTime: 5, category: 'Healthy', rating: 4.5, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
      { name: 'Boiled Corn Salad', pointsCost: 70, prepTime: 5, category: 'Healthy', rating: 4.6, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
      { name: 'Soya Chunks Stir Fry', pointsCost: 120, prepTime: 10, category: 'Healthy', rating: 4.7, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80' },
      { name: 'Avocado Toast', pointsCost: 160, prepTime: 8, category: 'Healthy', rating: 4.9, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80' }
    ]
  },
  {
    name: "Nand Juice", category: "Beverages", location: "Block 34", rating: 4.6,
    items: [
      { name: 'Mango Shake', pointsCost: 80, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80' },
      { name: 'Oreo Shake', pointsCost: 100, prepTime: 5, category: 'Beverages', rating: 4.8, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&q=80' },
      { name: 'Fresh Lime Soda', pointsCost: 40, prepTime: 3, category: 'Beverages', rating: 4.5, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80' },
      { name: 'Watermelon Juice', pointsCost: 60, prepTime: 5, category: 'Beverages', rating: 4.7, image: 'https://images.unsplash.com/photo-1622288000030-f2c96c561b36?w=500&q=80' },
      { name: 'Fruit Bowl', pointsCost: 90, prepTime: 5, category: 'Healthy', rating: 4.8, image: 'https://images.unsplash.com/photo-1490474418585-ba9f52c212d2?w=500&q=80' },
      { name: 'Strawberry Shake', pointsCost: 90, prepTime: 5, category: 'Beverages', rating: 4.7, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
      { name: 'Papaya Juice', pointsCost: 60, prepTime: 5, category: 'Beverages', rating: 4.4, image: 'https://images.unsplash.com/photo-1622288000030-f2c96c561b36?w=500&q=80' },
      { name: 'Orange Juice', pointsCost: 70, prepTime: 5, category: 'Beverages', rating: 4.8, image: 'https://images.unsplash.com/photo-1622288000030-f2c96c561b36?w=500&q=80' },
      { name: 'Cold Coffee', pointsCost: 80, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' },
      { name: 'Pineapple Juice', pointsCost: 60, prepTime: 5, category: 'Beverages', rating: 4.6, image: 'https://images.unsplash.com/photo-1622288000030-f2c96c561b36?w=500&q=80' },
      { name: 'Chocolate Shake', pointsCost: 110, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
      { name: 'Kiwi Smoothie', pointsCost: 120, prepTime: 5, category: 'Beverages', rating: 4.7, image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=500&q=80' },
      { name: 'Lemon Iced Tea', pointsCost: 60, prepTime: 3, category: 'Beverages', rating: 4.8, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80' },
      { name: 'Virgin Mojito', pointsCost: 90, prepTime: 5, category: 'Beverages', rating: 4.9, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80' },
      { name: 'Apple Juice', pointsCost: 80, prepTime: 5, category: 'Beverages', rating: 4.6, image: 'https://images.unsplash.com/photo-1622288000030-f2c96c561b36?w=500&q=80' }
    ]
  },
  {
    name: "Kathi Roll", category: "Snacks", location: "Block 34", rating: 4.7,
    items: [
      { name: 'Paneer Roll', pointsCost: 100, prepTime: 8, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Cheese Roll', pointsCost: 90, prepTime: 8, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Veg Mayo Roll', pointsCost: 80, prepTime: 8, category: 'Snacks', rating: 4.5, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Corn Roll', pointsCost: 70, prepTime: 8, category: 'Snacks', rating: 4.4, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Double Paneer Roll', pointsCost: 140, prepTime: 10, category: 'Snacks', rating: 4.9, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Soya Chaap Roll', pointsCost: 110, prepTime: 10, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Mushroom Roll', pointsCost: 120, prepTime: 10, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Aloo Tikki Roll', pointsCost: 60, prepTime: 8, category: 'Snacks', rating: 4.3, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Malai Chaap Roll', pointsCost: 130, prepTime: 10, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Mix Veg Roll', pointsCost: 90, prepTime: 8, category: 'Snacks', rating: 4.5, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Paneer Tikka Roll', pointsCost: 120, prepTime: 10, category: 'Snacks', rating: 4.9, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Spicy Cheese Roll', pointsCost: 100, prepTime: 8, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Sweet Corn Mayo Roll', pointsCost: 80, prepTime: 8, category: 'Snacks', rating: 4.4, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Afghani Chaap Roll', pointsCost: 140, prepTime: 12, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
      { name: 'Tandoori Paneer Roll', pointsCost: 130, prepTime: 10, category: 'Snacks', rating: 4.9, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' }
    ]
  },
  {
    name: "Snack Bar", category: "Snacks", location: "Block 25", rating: 4.5,
    items: [
      { name: 'Samosa', pointsCost: 20, prepTime: 2, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
      { name: 'Sandwich', pointsCost: 50, prepTime: 5, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=500&q=80' },
      { name: 'Maggi', pointsCost: 40, prepTime: 5, category: 'Fast Food', rating: 4.9, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80' },
      { name: 'French Fries', pointsCost: 60, prepTime: 5, category: 'Fast Food', rating: 4.7, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
      { name: 'Momos', pointsCost: 70, prepTime: 8, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&q=80' },
      { name: 'Cheese Maggi', pointsCost: 60, prepTime: 6, category: 'Fast Food', rating: 4.9, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80' },
      { name: 'Grilled Sandwich', pointsCost: 70, prepTime: 6, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=500&q=80' },
      { name: 'Kurkure Momos', pointsCost: 100, prepTime: 10, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&q=80' },
      { name: 'Kachori', pointsCost: 25, prepTime: 2, category: 'Snacks', rating: 4.5, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
      { name: 'Veg Patties', pointsCost: 35, prepTime: 2, category: 'Snacks', rating: 4.4, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
      { name: 'Bread Pakora', pointsCost: 30, prepTime: 2, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
      { name: 'Veg Hotdog', pointsCost: 80, prepTime: 5, category: 'Fast Food', rating: 4.5, image: 'https://images.unsplash.com/photo-1612871632598-a32057279313?w=500&q=80' },
      { name: 'Cheese Corn Nuggets', pointsCost: 90, prepTime: 8, category: 'Snacks', rating: 4.7, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
      { name: 'Nachos with Salsa', pointsCost: 110, prepTime: 5, category: 'Snacks', rating: 4.6, image: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=500&q=80' },
      { name: 'Spring Roll', pointsCost: 80, prepTime: 8, category: 'Snacks', rating: 4.8, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' }
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
