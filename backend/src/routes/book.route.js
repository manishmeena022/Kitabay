const express = require('express');
const { createBook, getAllBooks, getBooksById, updateBook, deleteBook } = require('../controllers/book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// Post a book
router.post('/create-book', verifyAdminToken, createBook)
router.get('/', getAllBooks)
router.get('/:id', getBooksById)
router.put('/edit/:id', verifyAdminToken, updateBook)
router.delete('/:id', verifyAdminToken, deleteBook)

module.exports = router;