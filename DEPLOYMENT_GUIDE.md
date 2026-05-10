# LPU FoodPulse — Deployment Guide 🚀

This guide covers everything needed to deploy the application for production using **Vercel** (Frontend) and **Render** (Backend).

## Step 1: Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Build a new free cluster (M0 sandbox).
3. Create a Database User with a secure username and password.
4. In Network Access, add `0.0.0.0/0` to allow connections from anywhere (required for Render).
5. Click "Connect" -> "Connect your application" and copy the connection string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/lpufoodpulse`

## Step 2: Backend Deployment (Render)
1. Go to [Render](https://render.com/) and create a free account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select the `FoodPluse` repository.
4. **Configuration Settings:**
   - **Root Directory:** `lpu-foodpulse-backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. **Environment Variables:**
   - Add `MONGO_URI` (Paste your MongoDB Atlas connection string from Step 1).
   - Add `JWT_SECRET` (Enter any long random string for security).
   - Add `PORT` with value `5000`.
6. Click **Create Web Service**. Render will deploy your backend. 
7. **Copy the Render URL** once deployment finishes (e.g., `https://lpu-foodpulse-backend.onrender.com`).

## Step 3: Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com/) and sign up.
2. Click **Add New Project** and import your `FoodPluse` GitHub repository.
3. **Configuration Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `lpu-foodpulse-client`
4. **Environment Variables:**
   - Add `VITE_API_URL` and paste your Render backend URL **followed by `/api`**. 
     - *Example:* `https://lpu-foodpulse-backend.onrender.com/api`
5. Click **Deploy**. Vercel will build and deploy your frontend.
6. **Copy your Vercel URL**. This is your final live frontend URL!

## Important Notes & Troubleshooting
- **CORS Issues:** If the frontend is blocked from accessing the backend, ensure your backend `server.js` has `app.use(cors())` enabled to allow all origins. (It is already configured correctly in this repo).
- **Cold Starts:** Render's free tier spins down the backend after 15 minutes of inactivity. The first API request might take 30-50 seconds to respond as it wakes up.
- **Vercel Routing:** Vite handles routing correctly on Vercel out of the box, but if you hit 404 errors on page refresh, you may need a `vercel.json` file in the frontend with a routing rewrite.
