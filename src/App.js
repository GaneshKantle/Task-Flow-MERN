import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser, logoutUser } from './api';

// Login Page Component
function LoginPage({ setLoginState }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await loginUser({ email, password });
      if (res.message === 'Login successful') {
        // Store user info in localStorage
        const user = await getCurrentUser();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        setLoginState(true); // Update parent component state
        navigate('/dashboard');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Register Page Component
function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const res = await registerUser({ fullName, email, password });
      if (res.message === 'Registration successful') {
        setSuccess('Registration successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us and get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              value={fullName} 
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Create a password"
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password"
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {success}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Logout Page Component
function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser();
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        
        // Show logout message for 2 seconds then redirect to login
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if logout fails
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-6">👋</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Goodbye!</h1>
        <p className="text-gray-600 mb-6">
          You have been successfully logged out. Redirecting to login page...
        </p>
        
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}

// Tasks Tab Component with Filtering
function TasksTab() {
  const [tasks] = useState([
    { id: 1, title: 'Design user interface', status: 'In Progress', priority: 'High', due: 'Today' },
    { id: 2, title: 'Review code changes', status: 'Pending', priority: 'Medium', due: 'Tomorrow' },
    { id: 3, title: 'Update documentation', status: 'Completed', priority: 'Low', due: 'Next week' },
    { id: 4, title: 'Fix bug in login system', status: 'Completed', priority: 'High', due: 'Yesterday' },
    { id: 5, title: 'Create API endpoints', status: 'In Progress', priority: 'Medium', due: 'This week' },
    { id: 6, title: 'Write unit tests', status: 'Pending', priority: 'Low', due: 'Next month' }
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusOptions = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Tasks</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Add Task
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Tasks</label>
            <input
              type="text"
              placeholder="Search by task title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
          {filterStatus !== 'All' && ` (${filterStatus})`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>
      
      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-sm text-gray-500">Due: {task.due}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ⋮
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? `No tasks match "${searchTerm}"`
                : filterStatus !== 'All' 
                  ? `No ${filterStatus.toLowerCase()} tasks`
                  : 'No tasks available'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Advanced Dashboard Component
function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    navigate('/logout');
  };

  const dashboardTabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'tasks', name: 'Tasks', icon: '✅' },
    { id: 'projects', name: 'Projects', icon: '📁' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Tasks</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <div className="text-4xl">📋</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Completed</p>
                    <p className="text-3xl font-bold">18</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Projects</p>
                    <p className="text-3xl font-bold">6</p>
                  </div>
                  <div className="text-4xl">📁</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Task completed', item: 'Design homepage', time: '2 hours ago' },
                  { action: 'Project created', item: 'E-commerce app', time: '1 day ago' },
                  { action: 'Comment added', item: 'Review feedback', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'tasks':
        return <TasksTab />;
      
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Projects</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                + New Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'E-commerce Platform', progress: 75, team: 4, status: 'Active' },
                { name: 'Mobile App', progress: 45, team: 3, status: 'Active' },
                { name: 'Website Redesign', progress: 90, team: 2, status: 'Review' }
              ].map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">{project.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>👥 {project.team} members</span>
                    <button className="text-blue-600 hover:text-blue-700">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Task Completion Rate</h4>
                  <div className="text-4xl font-bold text-green-600">85%</div>
                  <p className="text-gray-600 mt-2">+12% from last month</p>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Productivity Score</h4>
                  <div className="text-4xl font-bold text-blue-600">92</div>
                  <p className="text-gray-600 mt-2">Excellent performance</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Account Settings</h3>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Profile Information</h4>
                    <p className="text-gray-600">Update your personal details</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Edit</button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-gray-600">Manage your notification preferences</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Configure</button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Security</h4>
                    <p className="text-gray-600">Change password and security settings</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Update</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <div className="hidden md:flex space-x-1">
                {dashboardTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
}

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        if (loginStatus === 'true') {
          // Verify the session is still valid by calling the API
          const user = await getCurrentUser();
          if (user) {
            setIsLoggedIn(true);
          } else {
            // Clear invalid session
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        // Clear invalid session
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage setLoginState={setIsLoggedIn} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
