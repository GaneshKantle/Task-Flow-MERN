# TaskFlow Backend

## Setup Instructions

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start MongoDB locally or use MongoDB Atlas

3. Set environment variables:
   ```bash
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_secret_key
   MONGODB_URI=mongodb://localhost:27017/Random
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Cloud Deployment (Render)

1. **Connect your GitHub repository to Render**

2. **Create a new Web Service**

3. **Set Environment Variables in Render:**
   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_key_here
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Random
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Build Command:** `npm install`
5. **Start Command:** `npm start`

### MongoDB Atlas Setup (Required for Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `username`, `password`, and `cluster` in the connection string

### API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/me` - Get current user profile
- `POST /api/logout` - Logout user
- `GET /api/health` - Health check

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `JWT_SECRET` | JWT signing secret | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | No | 