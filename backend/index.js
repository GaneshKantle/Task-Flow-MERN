const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://classsyyyyy:9Zy1oVkS5pZi1BnN@random.mhs6vz1.mongodb.net/Random?retryWrites=true&w=majority&appName=Random";

mongoose.connect(MONGODB_URI, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('register-users', userSchema);

app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    
    // Create token and set cookie
    const token = jwt.sign({ 
      id: newUser._id, 
      email: newUser.email 
    }, JWT_SECRET, { expiresIn: '1d' });
    
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    }));
    
    res.json({ 
      message: 'Registration successful', 
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create token and set cookie
    const token = jwt.sign({ 
      id: user._id, 
      email: user.email 
    }, JWT_SECRET, { expiresIn: '1d' });
    
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    }));
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Profile endpoint
app.get('/api/me', async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (user) {
      res.json({ 
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  }));
  res.json({ message: 'Logged out' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected to Atlas' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB Atlas connection status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
}); 