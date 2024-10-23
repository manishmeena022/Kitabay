const express = require('express');
const { createBook, getAllBooks, getBooksById, updateBook, deleteBook } = require('../controllers/book.controller');
const router = express.Router();

// Post a book
router.post('/create-book', createBook)
router.get('/', getAllBooks)
router.get('/:id', getBooksById)
router.put('/edit/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router;