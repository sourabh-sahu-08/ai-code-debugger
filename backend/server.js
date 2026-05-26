const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

// Load environment variables
dotenv.config();

// Mongoose Database Connection
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Helmet Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors());

// Rate Limiter API spam prevention
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200 // Max requests
});
app.use(limiter);

// Setup Routing Gateways
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));

// Setup Global Error Parser Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server executing in ${process.env.NODE_ENV || 'development'} environment on port ${PORT}`);
});
