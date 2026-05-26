const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please add a secure password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password inputs
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate signed JWT
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id, name: this.name, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports = mongoose.model('User', UserSchema);
