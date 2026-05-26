const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

// Load environment configurations
dotenv.config();

// Connect Mongoose to Database
connectDB();

const app = express();

// Enable body parser
app.use(express.json());

// Enable request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Add security headers
app.use(helmet());

// Enable Cross-Origin requests
app.use(cors());

// Limit API spamming
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes duration
  max: 200 // Max requests limit
});
app.use(limiter);

// Bind routing modules
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));

// Bind generic global exception handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server executing in ${process.env.NODE_ENV} environment on port ${PORT}`);
});
