// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// Create Express app
const app = express();

// Set up middleware
const errorMiddleware = require('./middleware/error');

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Access-Control-Allow-Credentials: true
  optionSuccessStatus: 200,
};

// Apply middleware to the app
app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(morgan("dev")); // Enable request logging in the console
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookie header
app.use('/public', express.static('public')); // Serve static files from the 'public' directory

// Import and register routes
const userRoute = require('./routes/userRoutes');
const serviceRoute = require('./routes/servicesRoute');
const bookingRoute = require('./routes/bookingRoute');
const reviewRoute = require('./routes/reviewRoute');
const dashboardRoute = require('./routes/dashboardRoute');

app.use('/api/v1/user', userRoute); // Register user routes under the '/api/v1/user' endpoint
app.use('/api/v1/services', serviceRoute); // Register service routes under the '/api/v1/services' endpoint
app.use('/api/v1/bookings', bookingRoute); // Register booking routes under the '/api/v1/bookings' endpoint
app.use('/api/v1/reviews', reviewRoute); // Register review routes under the '/api/v1/reviews' endpoint
app.use('/api/v1/dashboard', dashboardRoute); // Register dashboard routes under the '/api/v1/dashboard' endpoint

// Error handling middleware
app.use(errorMiddleware);

// Export the app
module.exports = app;
