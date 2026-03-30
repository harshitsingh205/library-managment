const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// Get all authors
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    const filters = {};
    if (isActive !== undefined) filters.isActive = isActive === 'true';

    const authors = await Author.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Author.countDocuments(filters);

    res.json({
      success: true,
      count: authors.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: authors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, message: 'Author not found' });
    }
    res.json({ success: true, data: author });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new author
router.post('/', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update author
router.put('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete author
router.delete('/:id', async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
