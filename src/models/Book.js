const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    index: true
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    sparse: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  publisher: {
    type: String,
    trim: true
  },
  publicationYear: {
    type: Number,
    min: [1000, 'Invalid year'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  genre: {
    type: String,
    enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    maxlength: 1000
  },
  totalCopies: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 copy'],
    default: 1
  },
  availableCopies: {
    type: Number,
    default: 1
  },
  location: {
    shelf: String,
    row: String,
    section: String
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  price: {
    type: Number,
    min: 0
  },
  addedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
