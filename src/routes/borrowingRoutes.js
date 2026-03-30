const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');
const Member = require('../models/Member');

// Get borrowing records
router.get('/', async (req, res) => {
  try {
    const { memberId, status, page = 1, limit = 10 } = req.query;
    const filters = {};
    if (memberId) filters.memberId = memberId;
    if (status) filters.status = status;

    const records = await Borrowing.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('bookId')
      .populate('memberId');

    const total = await Borrowing.countDocuments(filters);

    res.json({
      success: true,
      count: records.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Borrow a book
router.post('/borrow', async (req, res) => {
  try {
    const { bookId, memberId, dueDate } = req.body;

    // Check book availability
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: 'Book not available' });
    }

    // Check member limit
    const member = await Member.findById(memberId);
    if (!member || member.currentBorrowingCount >= member.borrowingLimit) {
      return res.status(400).json({ success: false, message: 'Borrowing limit exceeded' });
    }

    // Create borrowing record
    const borrowing = new Borrowing({
      bookId,
      memberId,
      dueDate: new Date(dueDate)
    });

    await borrowing.save();

    // Update book availability
    book.availableCopies--;
    await book.save();

    // Update member borrowing count
    member.currentBorrowingCount++;
    await member.save();

    res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrowing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Return a book
router.post('/return/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);
    if (!borrowing) {
      return res.status(404).json({ success: false, message: 'Borrowing record not found' });
    }

    if (borrowing.status === 'Returned') {
      return res.status(400).json({ success: false, message: 'Book already returned' });
    }

    borrowing.returnDate = new Date();
    borrowing.status = 'Returned';

    // Calculate fine if overdue
    const now = new Date();
    if (now > borrowing.dueDate) {
      const daysOverdue = Math.floor((now - borrowing.dueDate) / (1000 * 60 * 60 * 24));
      borrowing.fineAmount = daysOverdue * 5; // $5 per day
    }

    await borrowing.save();

    // Update book availability
    const book = await Book.findById(borrowing.bookId);
    book.availableCopies++;
    await book.save();

    // Update member
    const member = await Member.findById(borrowing.memberId);
    member.currentBorrowingCount--;
    if (borrowing.fineAmount > 0) {
      member.fines += borrowing.fineAmount;
    }
    await member.save();

    res.json({ success: true, message: 'Book returned successfully', data: borrowing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
