const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Borrowed', 'Returned', 'Overdue'],
    default: 'Borrowed'
  },
  fineAmount: {
    type: Number,
    default: 0
  },
  finePaid: {
    type: Boolean,
    default: false
  },
  notes: String
}, { timestamps: true });

// Index for faster queries
borrowingSchema.index({ memberId: 1, status: 1 });
borrowingSchema.index({ bookId: 1 });
borrowingSchema.index({ dueDate: 1, status: 1 });

module.exports = mongoose.model('Borrowing', borrowingSchema);
