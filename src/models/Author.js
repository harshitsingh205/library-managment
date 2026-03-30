const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    lowercase: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  birthYear: {
    type: Number,
    min: [1000, 'Invalid year']
  },
  nationality: String,
  website: String,
  awards: [String],
  totalBooks: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
