const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, author } = req.query;
    const filters = {};
    if (genre) filters.genre = genre;
    if (author) filters.author = author;

    const books = await Book.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('author')
      .exec();

    const total = await Book.countDocuments(filters);

    res.json({
      success: true,
      count: books.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: books
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
