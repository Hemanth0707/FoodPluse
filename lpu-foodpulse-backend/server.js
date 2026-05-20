const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const Stall = require('./models/Stall');
const seedDB = require('./seed');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/stalls', require('./routes/stalls'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/upload', require('./routes/upload'));

// Serve static files from uploads folder
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('LPU FoodPulse API is running...');
});

// TEMPORARY FORCE-SEED ENDPOINT
app.get('/api/force-seed', async (req, res) => {
  try {
    await seedDB();
    res.json({ message: 'Database successfully force-seeded with new UI data.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.io for Real-time
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lpufoodpulse')
  .then(async () => {
    console.log('MongoDB Connected');
    
    // Auto-seed Production DB if empty
    try {
      const stallCount = await Stall.countDocuments();
      if (stallCount === 0) {
        console.log('Database is empty. Running auto-seeder...');
        await seedDB();
        console.log('Auto-seeding complete.');
      }
    } catch (seedErr) {
      console.error('Auto-seeding failed:', seedErr);
    }

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB Connection Error:', err));
