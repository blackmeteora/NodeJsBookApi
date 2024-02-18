import express from 'express';
import { getAllBooks, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve all books
 *     description: Retrieve a list of all books
 *     responses:
 *       '200':
 *         description: A list of books
 */
router.get('/list', getAllBooks);

router.post('/create', createBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

export default router;