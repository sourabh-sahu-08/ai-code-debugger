const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Node.js SRV resolution issues on some networks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from environment variables');
    }

    console.log('Attempting MongoDB Atlas connection...');
    console.log(
      'MongoDB host:',
      process.env.MONGODB_URI.split('@')[1]?.split('/')[0] || 'Unable to detect host'
    );

    // Check for unencoded special characters in the password safely
    const uriParts = process.env.MONGODB_URI.split('@');
    if (uriParts.length === 2) {
      const credentials = uriParts[0].replace('mongodb+srv://', '').replace('mongodb://', '');
      const [, password] = credentials.split(':');
      if (password && decodeURIComponent(password) === password && password.match(/[^a-zA-Z0-9]/)) {
        console.warn('WARNING: Password in MONGODB_URI may contain unencoded special characters. Ensure it is URL encoded if connection fails.');
      }
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    return conn;

  } catch (err) {
    console.error('MongoDB Connection Failed');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);

    // Help distinguish error types
    if (err.message.includes('ECONNREFUSED') || err.message.includes('querySrv')) {
      console.error('Diagnostic: Network or DNS resolution error. Check if your DNS allows SRV lookups and if your IP is whitelisted in Atlas.');
    } else if (err.name === 'MongoServerError' && err.message.includes('bad auth')) {
      console.error('Diagnostic: Authentication failed. Check username, password, and special character encoding in the MONGODB_URI.');
    } else if (err.message.includes('Invalid scheme')) {
      console.error('Diagnostic: Invalid connection string format.');
    }

    throw err;
  }
};

module.exports = connectDB;