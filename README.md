# TaskFlow - MERN Stack Application

A modern task management application built with React, Node.js, Express, and MongoDB.

## 🚀 Quick Deployment Guide

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Render)
1. Push your code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

## 📁 Project Structure

```
taskflow-mern/
├── src/                 # React frontend
├── backend/            # Node.js backend
├── package.json        # Frontend dependencies
└── README.md          # This file
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd taskflow-mern
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Start MongoDB locally or use MongoDB Atlas**

5. **Start the backend:**
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend:**
   ```bash
   npm start
   ```

## 🌐 Cloud Deployment

### Frontend (Vercel)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Connect your GitHub repository
   - Deploy automatically

3. **Set Environment Variables in Vercel:**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

### Backend (Render)

1. **Create Render Account:**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service:**
   - Connect your GitHub repository
   - Select the `backend` folder
   - Choose "Node" as runtime

3. **Set Environment Variables:**
   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_key_here
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Random
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy:**
   - Build Command: `npm install`
   - Start Command: `npm start`

### MongoDB Atlas (Required for Cloud)

1. **Create Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account

2. **Create Cluster:**
   - Choose free tier
   - Select region
   - Create cluster

3. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

4. **Add to Render Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Random
   ```

## 🔑 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Backend (Render Environment Variables)
```
NODE_ENV=production
JWT_SECRET=your_super_secret_key_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Random
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 📱 Features

- ✅ User Authentication (Register/Login/Logout)
- ✅ Secure JWT Sessions
- ✅ MongoDB Database
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive Design
- ✅ Dashboard with Multiple Tabs
- ✅ Cloud-Ready Deployment

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express, JWT, bcryptjs
- **Database:** MongoDB with Mongoose
- **Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies
- CORS protection
- Environment variable configuration

## 📞 Support

If you encounter any issues:
1. Check the console for errors
2. Verify environment variables
3. Ensure MongoDB connection
4. Check CORS settings

## 🚀 Live Demo

Once deployed, your app will be available at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com` # Task-Flow-MERN
