const Book = require('../models/book.model');

const createBook = async (req, res) => {
    try {
        console.log("req body", req.body)

        const { title, description, category, trending, coverImage, oldPrice, newPrice } = req.body;

        if (!title || !description || !category || !trending === undefined || !coverImage) {
            return res.status(400).json({ message: 'All required fields must be filled.' })
        }

        const newBook = new Book({
            title,
            description,
            category,
            trending,
            coverImage,
            oldPrice,
            newPrice
        })

        await newBook.save();

        res.status(201).json({
            message: 'Book created successfully',
            book: newBook
        });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).json({ message: 'Failed to create book', error: error.message })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' })
        }

        res.status(200).json({
            message: 'Books fetched successfully',
            books: books
        });

    } catch (error) {
        console.error('Error fetching Books', error);
        res.status(500).json({ message: 'Failed to fetch books', error: error.message })
    }
}

const getBooksById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }

        res.status(200).json({
            message: 'Book fetched Successfully',
            book: book
        });
    } catch (error) {
        console.error('Error fetching book', error);
        res.status(500).json({ message: 'Failed to find book', error: error.message })
    }
}
 
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, trending, coverImage, oldPrice, newPrice } = req.body;


        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, description, category, trending, coverImage, oldPrice, newPrice },
            { new: true, runValidators: true }
        )

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' })
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        });

    } catch (error) {
        console.error('Error in updating book', error);
        res.status(500).json({ message: 'Failed to update book', error: error.message })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' })
        }

        res.status(200).json({
            message: 'Book deleted successfully',
            book: deletedBook
        })

    } catch (error) {
        console.error('Error in deleting book', error);
        res.status(500).json({ message: 'Failed to delete book', error: error.message })
    }
}

module.exports = { createBook, getAllBooks, getBooksById, updateBook, deleteBook }