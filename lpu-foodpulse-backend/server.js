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
      // FORCE SEED HACK (Temporary)
      console.log('Database is being forcefully wiped and re-seeded for the UI fix...');
      await seedDB();
      console.log('Auto-seeding complete.');
    } catch (seedErr) {
      console.error('Auto-seeding failed:', seedErr);
    }

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB Connection Error:', err));
