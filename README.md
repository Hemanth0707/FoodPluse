# LPU FoodPulse — Smart Campus Food Ecosystem 🍔📱

A premium, full-stack MERN student super-app built to revolutionize the campus food experience at Lovely Professional University. 

![LPU FoodPulse Dashboard](https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80)

## 🌟 Features
- **Smart Campus Food Ecosystem**: AI-verified food complaint reporting for hostile mess quality.
- **Dynamic Marketplace**: View and order from all live campus stalls in real-time.
- **Realistic Order Flow**: Seamless wallet deduction, unique pickup QR tokens, and live order preparation tracking.
- **Premium Student Profile**: Comprehensive student dashboard with analytics, unlocks, and activity history.
- **Luxurious UI/UX**: Built with a sleek glassmorphism aesthetic, smooth Framer Motion animations, and responsive split-screen layouts.

## 🛠 Tech Stack
**Frontend:**
- React 19 + Vite
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- Axios
- Lucide React (Icons)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT) & bcryptjs (Auth)
- Multer (File Uploads)

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Hemanth0707/FoodPluse.git
cd FoodPluse
```

### 2. Backend Setup
```bash
cd lpu-foodpulse-backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
node seed.js # To populate mock data
npm start
```

### 3. Frontend Setup
```bash
cd lpu-foodpulse-client
npm install
cp .env.example .env
npm run dev
```

## 📁 Folder Structure
```
LPU_FoodPulse/
├── lpu-foodpulse-backend/      # Express API server
│   ├── controllers/            # Route logic
│   ├── middleware/             # Auth/JWT middleware
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express routes
│   └── server.js               # Entry point
└── lpu-foodpulse-client/       # React frontend
    ├── src/
    │   ├── components/         # Reusable UI elements
    │   ├── pages/              # Main app views
    │   ├── store/              # Zustand global state
    │   └── index.css           # Global glassmorphism styles
```

## 🌍 Deployment Guide
Follow the instructions in `DEPLOYMENT_GUIDE.md` to deploy this application to Vercel (Frontend) and Render (Backend).
